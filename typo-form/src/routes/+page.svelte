<script lang="ts">
    import { onMount } from "svelte";
    import PocketBase from "pocketbase";
    import type { RecordModel } from "pocketbase";
    import * as XLSX from 'xlsx';

    const pb = new PocketBase(`${location.protocol}//${location.host}`);

    async function get_collection(collection_name: string): Promise<RecordModel[]> {
        return await pb.collection(collection_name).getFullList({sort: "+order"});
    }

    function safeGet(map: Map<string, RecordModel[]>, key: string): RecordModel[] {
        let res = map.get(key);
        if (res == undefined) {
            return []
        }
        return res;
    }

    let formats: RecordModel[] = [],
        fastenings: RecordModel[] = [],
        colors: RecordModel[] = [],
        papers: RecordModel[] = [],
        printers: RecordModel[] = [];
    onMount(async () => {
        formats = await get_collection("formats");
        fastenings = await get_collection("fastenings");
        colors = await get_collection("colors");
        papers = await get_collection("papers");
        printers = await get_collection("printers");
    });


    let orderTitle: string,
        orderExtOrderNum: string,
        orderCirculation: BigInt,
        orderFormat: RecordModel,
        orderPageNum: BigInt,
        orderFastening: RecordModel,
        orderBlockColor: RecordModel,
        orderCoverColor: RecordModel,
        orderBlockDepartureElements: boolean,
        orderCoverDepartureElements: boolean,
        orderBlockPaper: RecordModel,
        orderCoverPaper: RecordModel,
        orderBlockPrinter: RecordModel,
        orderCoverPrinter: RecordModel,
        orderCoverLamination: boolean;

    let braceFasteningDisabled = false,
        braceFasteningDisabledPromt = "";
    function braceRule() {
        if (!orderFormat || !orderPageNum) {
            return
        }
        if (orderPageNum > orderFormat.brace_max_pages) {
            braceFasteningDisabled = true;
            braceFasteningDisabledPromt = ` - количество страниц превышает ${orderFormat.brace_max_pages} для формата ${orderFormat.name}`;
        } else {
            braceFasteningDisabled = false;
            braceFasteningDisabledPromt = "";
        }
    }

    function printerRule(color: RecordModel | undefined, paper: RecordModel | undefined): [boolean, boolean, boolean, string] {
        let risographPrinterDisable = false,
            digitalPrinterDisable = false,
            disableWholeSection = false,
            printerDisabledPromt = "";
        
        if (color) {
            risographPrinterDisable = !color.is_risograph_available;
            digitalPrinterDisable = !color.is_digital_available;
            if (risographPrinterDisable || digitalPrinterDisable) {
                printerDisabledPromt = ` - недоступно для цветности ${color.name}`;
            }
        }
        
        if (paper) {
            risographPrinterDisable = !paper.is_risograph_available;
            digitalPrinterDisable = !paper.is_digital_available;
            disableWholeSection = paper.is_empty;
            if (risographPrinterDisable || digitalPrinterDisable) {
                printerDisabledPromt = ` - недоступно для бумаги ${paper.name}`;
            }
        }

        if (color && paper) {
            risographPrinterDisable = !(color.is_risograph_available && paper.is_risograph_available);
            digitalPrinterDisable = !(color.is_digital_available && paper.is_digital_available);
            var risographPrinterFullPromt = !(color.is_risograph_available || paper.is_risograph_available);
            var digitalPrinterFullPromt = !(color.is_digital_available || paper.is_digital_available);
            if (risographPrinterFullPromt || digitalPrinterFullPromt) {
                printerDisabledPromt = ` - недоступно для цветности ${color.name} и бумаги ${paper.name}`;
            }
        }

        return [
            risographPrinterDisable,
            digitalPrinterDisable,
            disableWholeSection,
            printerDisabledPromt
        ];
    }

    let blockRisographPrinterDisable = false,
        blockDigitalPrinterDisable = false,
        blockPrinterDisabledPromt = "";
    function blockPrinterRule() {
        var ruled_params = printerRule(orderBlockColor, orderBlockPaper);
        blockRisographPrinterDisable = ruled_params[0];
        blockDigitalPrinterDisable = ruled_params[1];
        blockPrinterDisabledPromt = ruled_params[3];
        }

    let coverRisographPrinterDisable = false,
        coverDigitalPrinterDisable = false,
        coverDisable = false,
        coverPrinterDisabledPromt = "";
    function coverPrinterRule() {
        var ruled_params = printerRule(orderCoverColor, orderCoverPaper);
        coverRisographPrinterDisable = ruled_params[0];
        coverDigitalPrinterDisable = ruled_params[1];
        coverDisable = ruled_params[2];
        coverPrinterDisabledPromt = ruled_params[3];
    }

    let reportIsFormed = false,
        report_sections_fields: Map<string, RecordModel[]> = new Map(),
        order_report: RecordModel = {
            collectionId: "", collectionName: "", id: "", created: "", updated: ""
        };
    async function submitOrder() {
        const block_format_rule = await pb.collection("block_format_rules").getFirstListItem(`format.id = "${orderFormat.id}"`);
        const block_multiplicity = block_format_rule.multiplicity;
        const block_format = orderBlockDepartureElements ? block_format_rule.format_w_departure_elements : block_format_rule.format_wo_departure_elements;
        
        let cover_multiplicity,
            cover_format;
        if (!orderCoverPaper.is_empty) {
            const cover_format_rule = await pb.collection("cover_format_rules").getFirstListItem(`format.id = "${orderFormat.id}" && fasterning ~ "${orderFastening.id}"`);
            cover_multiplicity = cover_format_rule.multiplicity;
            cover_format = orderCoverDepartureElements ? cover_format_rule.format_w_departure_elements : cover_format_rule.format_wo_departure_elements;
        }

        let order = await pb.collection("orders").create({
            title: orderTitle,
            ext_order_num: orderExtOrderNum,
            circulation: orderCirculation,
            format: orderFormat ? orderFormat.id : orderFormat,
            page_num: orderPageNum,
            fastening: orderFastening ? orderFastening.id : orderFastening,
            block_color: orderBlockColor ? orderBlockColor.id : orderBlockColor,
            cover_color: orderCoverColor ? orderCoverColor.id : orderCoverColor,
            block_departure_elements: orderBlockDepartureElements,
            cover_departure_elements: orderCoverDepartureElements,
            block_paper: orderBlockPaper ? orderBlockPaper.id : orderBlockPaper,
            cover_paper: orderCoverPaper ? orderCoverPaper.id : orderCoverPaper,
            block_printer: orderBlockPrinter ? orderBlockPrinter.id : orderBlockPrinter,
            cover_printer: orderCoverPrinter ? orderCoverPrinter.id : orderCoverPrinter,
            cover_lamination: orderCoverLamination,
            block_multiplicity: block_multiplicity,
            block_format: block_format,
            cover_multiplicity: cover_multiplicity,
            cover_format: cover_format
        });

        const report_fields = await get_collection("report_fields");
        report_sections_fields = Map.groupBy(report_fields, ({section}) => section);
        order_report = await pb.collection("orders_reports").getOne(order.id);

        reportIsFormed = true;
        document.location.href += "#order-report";
    }

    function saveOrderReportAsExcel() {
        const table = document.getElementById("orderReport");
        const tableName = `${order_report.ext_order_num}-${order_report.title}`
        const wb = XLSX.utils.table_to_book(table, {sheet: order_report.ext_order_num});
        const ws = wb.Sheets[wb.SheetNames[0]];
        ws['!cols']?.push({ width: 45 }, { width: 20 }, { width: 30 });
        XLSX.writeFile(wb, `${tableName}.xlsx`, {cellStyles: true});
    }
</script>

<div id="typo-form" class="container">
    <h1>Калькулятор заказов типографии</h1>
    <hr>
    <form on:submit={submitOrder}>
        <div class="form-group">
            <label for="orderTitle">Название заказа</label>
            <input required type="text" class="form-control" id="orderTitle" placeholder="Введите название заказа" bind:value={orderTitle}>
        </div>
        <div class="form-group">
            <label for="orderExtOrderNum">Номер заказа</label>
            <input required type="text" class="form-control" id="orderExtOrderNum" placeholder="Введите номер заказа" bind:value={orderExtOrderNum}>
        </div>
        <div class="form-group">
            <label for="orderCirculation">Тираж</label>
            <input required type="number" class="form-control" id="orderCirculation" placeholder="Введите тираж" min="1" bind:value={orderCirculation}>
        </div>
        <div class="form-group">
            <label for="orderFormat">Формат</label>
            <select required class="form-control" id="orderFormat" bind:value={orderFormat} on:change={braceRule}>
                {#each formats as format}
                    <option value="{format}">{format.name}</option>
                {/each}
            </select>
        </div>
        <div class="form-group">
            <label for="orderPageNum">Количество страниц</label>
            <input required type="number" class="form-control" id="orderPageNum" placeholder="Введите количество страниц" min="1" bind:value={orderPageNum} on:input={braceRule}>
        </div>
        <div class="form-group">
            <label for="orderFastening">Вид крепления</label>
            <select required class="form-control" id="orderFastening" bind:value={orderFastening}>
                {#each fastenings as fastening}
                    <option value="{fastening}"
                        disabled="{fastening.is_brace && braceFasteningDisabled}"
                    >
                        {`${fastening.name}${fastening.is_brace && braceFasteningDisabled ? braceFasteningDisabledPromt : ""}`}
                    </option>
                {/each}
            </select>
        </div>
        <div class="row">
            <div class="col">
                <h3>Блок</h3>
                <hr>
                <div class="form-group">
                    <label for="orderBlockPaper">Бумага на блок</label>
                    <select required class="form-control" id="orderBlockPaper" bind:value={orderBlockPaper} on:change={blockPrinterRule}>
                        {#each papers as paper}
                            {#if paper.is_block_avaliable}
                                <option value="{paper}">{paper.name}</option>
                            {/if}
                        {/each}
                    </select>
                </div>
                <div class="form-group">
                    <label for="orderBlockColor">Цветность блока</label>
                    <select required class="form-control" id="orderBlockColor" bind:value={orderBlockColor} on:change={blockPrinterRule}>
                        {#each colors as color}
                            {#if color.is_block_avaliable}
                                <option value="{color}">{color.name}</option>
                            {/if}
                        {/each}
                    </select>
                </div>
                <div class="form-check">
                    <label class="form-check-label" for="orderBlockDepartureElements">Элементы на вылет блока</label>
                    <input type="checkbox" class="form-check-input" id="orderBlockDepartureElements" bind:checked={orderBlockDepartureElements}>
                </div>
                <div class="form-group">
                    <label for="orderBlockPrinter">На чём печатать блок</label>
                    <select required class="form-control" id="orderBlockPrinter" bind:value={orderBlockPrinter}>
                        {#each printers as printer}
                            <option value="{printer}"
                                disabled="{printer.is_risograph && blockRisographPrinterDisable || printer.is_digital && blockDigitalPrinterDisable}"
                            >
                                {`${printer.name}${printer.is_risograph && blockRisographPrinterDisable || printer.is_digital && blockDigitalPrinterDisable ? blockPrinterDisabledPromt : ""}`}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
            <div class="col">
                <h3>Обложка</h3>
                <hr>
                <div class="form-group">
                    <label for="orderCoverPaper">Бумага на обложку</label>
                    <select required class="form-control" id="orderCoverPaper" bind:value={orderCoverPaper} on:change={coverPrinterRule}>
                        {#each papers as paper}
                            {#if paper.is_cover_avaliable}
                                <option value="{paper}">{paper.name}</option>
                            {/if}
                        {/each}
                    </select>
                </div>
                <div class="form-group">
                    <label for="orderCoverColor">Цветность обложки</label>
                    <select required class="form-control" id="orderCoverColor" disabled="{coverDisable}" bind:value={orderCoverColor} on:change={coverPrinterRule}>
                        {#each colors as color}
                            {#if color.is_cover_avaliable}
                                <option value="{color}">{color.name}</option>
                            {/if}
                        {/each}
                    </select>
                </div>
                <div class="form-check">
                    <label class="form-check-label" for="orderCoverDepartureElements">Элементы на вылет обложки</label>
                    <input type="checkbox" class="form-check-input" id="orderCoverDepartureElements" disabled="{coverDisable}" bind:checked={orderCoverDepartureElements}>
                </div>
                <div class="form-group">
                    <label for="orderCoverPrinter">На чём печатать обложку</label>
                    <select required class="form-control" id="orderCoverPrinter" disabled="{coverDisable}" bind:value={orderCoverPrinter}>
                        {#each printers as printer}
                            <option value="{printer}"
                                disabled="{printer.is_risograph && coverRisographPrinterDisable || printer.is_digital && coverDigitalPrinterDisable}"
                            >
                                {`${printer.name}${printer.is_risograph && coverRisographPrinterDisable || printer.is_digital && coverDigitalPrinterDisable ? coverPrinterDisabledPromt : ""}`}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="form-check">
                    <label class="form-check-label" for="orderCoverLamination">Ламинация обложки</label>
                    <input type="checkbox" class="form-check-input" id="orderCoverLamination" disabled="{coverDisable}" bind:checked={orderCoverLamination}>
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary" disabled={reportIsFormed}>Рассчитать заказ</button>
        <button on:click={() => location.reload()} class="btn btn-warning" disabled={!reportIsFormed}>Очистить форму</button>
    </form>
</div>

{#if reportIsFormed}
    <div id="order-report" class="container" >
        <div class="row">
            <div class="col">
                <h2>Итог расчёта</h2>
                <button on:click={saveOrderReportAsExcel} class="btn btn-success btn-sm">Сохранить как XLSX</button>
                <hr>
                <table id="orderReport" class="table table-bordered table-hover">
                    <tbody>
                        {#each report_sections_fields.keys() as report_section}
                            <tr>
                                <th colspan="3" style="padding-bottom: 0" class="table-secondary border-ligh">{report_section}</th>
                            </tr>
                            {#each safeGet(report_sections_fields, report_section) as report_field}
                                {#if report_field.is_name_value_pair && order_report[`${report_field.key}_name`] != null}
                                    <tr>
                                        <th>{order_report[`${report_field.key}_name`]}</th>
                                        <td>{order_report[`${report_field.key}_value`]}</td>
                                        
                                        {#if report_field.units}
                                            <td>{report_field.units}</td>
                                        {/if}
                                    </tr>
                                {:else if order_report[report_field.key] != null}
                                    <tr>
                                        <th>{report_field.name}</th>
                                        <td colspan="{report_field.units ? 1 : 2}">
                                            {#if report_field.is_datetime}
                                                {new Date(order_report[report_field.key]).toLocaleString()}
                                            {:else if report_field.is_boolean}
                                                {order_report[report_field.key] ? "Да" : "Нет"}
                                            {:else}
                                                {order_report[report_field.key]}
                                            {/if}
                                        </td>
                                        {#if report_field.units}
                                            <td>{report_field.units}</td>
                                        {/if}
                                    </tr>
                                {/if}
                            {/each}
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="col" />
        </div>
    </div>
{/if}
