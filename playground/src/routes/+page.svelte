<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript } from "@codemirror/lang-javascript";
    import { onMount } from "svelte";
    import { Processing } from "processing-ts/browser";

    type ProcessingSketch = {
        exit?: () => void;
    };

    type ProcessingConstructor = {
        new (canvas: HTMLCanvasElement, source: string): ProcessingSketch;
        compile(source: string): { sourceCode?: string };
        logger?: {
            BufferArray?: string[];
            javaconsole?: HTMLDivElement;
            hideconsole?: () => void;
        };
    };

    const exampleModules = import.meta.glob(
        "../../../tests/code-examples/*.pde",
        {
            query: "?raw",
            import: "default",
            eager: true,
        },
    ) as Record<string, string>;

    const examples = Object.entries(exampleModules)
        .map(([path, code]) => ({
            id: path,
            label:
                path
                    .split("/")
                    .pop()
                    ?.replace(/\.pde$/, "") ?? path,
            code,
        }))
        .sort((left, right) => left.label.localeCompare(right.label));

    const defaultExample = examples[0] ?? null;

    let source = $state(defaultExample?.code ?? "");
    let selectedExample = $state(defaultExample?.id ?? "");
    let compilePreview = $state(
        "// Processing.compile(...) output will appear here",
    );
    let consoleHtml = $state("<em>Run the sketch to see println output.</em>");
    let status = $state("Initializing processing-ts...");
    let error = $state("");

    let canvas: HTMLCanvasElement;
    let consolePanel: HTMLDivElement;
    let processing: ProcessingConstructor | null = null;
    let activeSketch: ProcessingSketch | null = null;
    let consoleObserver: MutationObserver | null = null;
    let bodyObserver: MutationObserver | null = null;

    function clearNativeConsole() {
        const logger = processing?.logger;
        if (logger?.BufferArray) {
            logger.BufferArray.length = 0;
        }
        if (logger?.javaconsole) {
            logger.javaconsole.innerHTML = "";
        }
        logger?.hideconsole?.();
    }

    function mirrorConsole(consoleElement: Element | null) {
        if (!consoleElement) {
            consoleHtml = "<em>No console output yet.</em>";
            return;
        }

        const update = () => {
            consoleHtml =
                (consoleElement as HTMLElement).innerHTML ||
                "<em>No console output yet.</em>";
            consolePanel?.scrollTo({ top: consolePanel.scrollHeight });
        };

        update();
        consoleObserver?.disconnect();
        consoleObserver = new MutationObserver(update);
        consoleObserver.observe(consoleElement, {
            childList: true,
            subtree: true,
            characterData: true,
        });
    }

    function connectConsoleMirror() {
        mirrorConsole(
            processing?.logger?.javaconsole ??
                document.querySelector(".pjsconsole .console"),
        );

        bodyObserver?.disconnect();
        bodyObserver = new MutationObserver(() => {
            const consoleElement =
                processing?.logger?.javaconsole ??
                document.querySelector(".pjsconsole .console");
            if (consoleElement) {
                mirrorConsole(consoleElement);
            }
        });
        bodyObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    function stopSketch() {
        activeSketch?.exit?.();
        activeSketch = null;
        consoleObserver?.disconnect();
        bodyObserver?.disconnect();
        clearNativeConsole();
    }

    function runSketch() {
        if (!processing) {
            status = "processing-ts is still loading.";
            return;
        }

        stopSketch();
        error = "";
        consoleHtml = "<em>Running sketch...</em>";

        try {
            compilePreview =
                processing.compile(source).sourceCode ??
                "// compile returned no sourceCode";
            activeSketch = new processing(canvas, source);
            connectConsoleMirror();
            status = "Sketch is running.";
        } catch (cause) {
            error = cause instanceof Error ? cause.message : String(cause);
            status = "Sketch failed.";
            consoleHtml = `<strong>Runtime error</strong><br>${error}`;
        }
    }

    function selectExample(value: string) {
        selectedExample = value;

        const example = examples.find((entry) => entry.id === value);
        if (example) {
            source = example.code;
        }
    }

    onMount(() => {
        processing = Processing as ProcessingConstructor;
        status = "processing-ts loaded.";
        runSketch();

        return () => {
            stopSketch();
        };
    });
</script>

<svelte:head>
    <title>processing-ts playground</title>
</svelte:head>

<div class="layout">
    <section class="editor-pane">
        <div class="pane-head">
            <div>
                <p class="eyebrow">Editor</p>
                <h1>processing-ts playground</h1>
            </div>

            <div class="actions">
                <label class="example-picker">
                    <span>Example</span>
                    <select
                        value={selectedExample}
                        onchange={(event) =>
                            selectExample(
                                (event.currentTarget as HTMLSelectElement)
                                    .value,
                            )}
                    >
                        {#each examples as example}
                            <option value={example.id}>{example.label}</option>
                        {/each}
                    </select>
                </label>
                <button class="primary" onclick={runSketch}>Run sketch</button>
                <button
                    class="ghost"
                    onclick={() => selectExample(defaultExample?.id ?? "")}
                    >Reset</button
                >
            </div>
        </div>

        <div class="editor-shell">
            <CodeMirror
                bind:value={source}
                lang={javascript()}
                lineWrapping
                styles={{ "&": { height: "100%", fontSize: "14px" } }}
            />
        </div>
    </section>

    <section class="output-pane">
        <div class="surface">
            <div class="surface-head">
                <h2>Draw</h2>
                <p>{status}</p>
            </div>
            <div class="canvas-wrap">
                <canvas bind:this={canvas}></canvas>
            </div>
            {#if error}
                <pre class="error">{error}</pre>
            {/if}
        </div>

        <div class="surface">
            <div class="surface-head">
                <h2>Console</h2>
                <p>Mirrored from Processing println output</p>
            </div>
            <div class="console-wrap" bind:this={consolePanel}>
                <div class="console-output">{@html consoleHtml}</div>
            </div>
        </div>

        <div class="surface">
            <div class="surface-head">
                <h2>Compiled Preview</h2>
                <p>Generated via <code>Processing.compile(...)</code></p>
            </div>
            <pre>{compilePreview}</pre>
        </div>
    </section>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: monospace;
        background: #f5f5f5;
        color: #111;
    }

    .layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        min-height: 100dvh;
        padding: 0.75rem;
        box-sizing: border-box;
    }

    .editor-pane,
    .output-pane {
        display: grid;
        gap: 0.75rem;
        min-height: 0;
    }

    .editor-pane {
        grid-template-rows: auto auto 1fr;
    }

    .output-pane {
        grid-template-rows: auto auto 1fr;
    }

    .pane-head,
    .surface-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
    }

    .actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .example-picker {
        display: grid;
        gap: 0.2rem;
        font-size: 0.75rem;
    }

    .example-picker select {
        min-width: 14rem;
        border: 1px solid #ccc;
        background: #fff;
        color: #111;
        padding: 0.45rem 0.6rem;
        font: inherit;
    }

    .eyebrow {
        margin: 0;
        font-size: 0.75rem;
    }

    h1,
    h2,
    p {
        margin: 0;
    }

    button {
        border: 1px solid #ccc;
        background: #fff;
        color: #111;
        padding: 0.45rem 0.6rem;
        font: inherit;
        cursor: pointer;
    }

    .editor-shell,
    .surface {
        border: 1px solid #ccc;
        background: #fff;
        min-height: 0;
    }

    .surface {
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 0.25rem;
        padding: 0.5rem;
    }

    .canvas-wrap,
    .console-wrap,
    pre {
        min-height: 0;
        overflow: auto;
    }

    canvas {
        display: block;
        max-width: 100%;
    }

    .console-output,
    pre,
    code {
        font-family: monospace;
    }

    .error {
        margin: 0;
    }

    :global(.editor-shell .cm-editor) {
        height: 100%;
    }

    :global(.editor-shell .cm-scroller) {
        overflow: auto;
    }

    @media (max-width: 900px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }
</style>
