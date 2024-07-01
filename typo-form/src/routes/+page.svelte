<script lang="ts">
    import { onMount } from "svelte";
    import PocketBase from "pocketbase";
    import type { RecordModel, RecordListOptions } from "pocketbase";
    import * as XLSX from 'xlsx';

    const pb = new PocketBase(`${location.protocol}//${location.host}`);

    async function get_collection(order_id: string , collection_name: string, has_order: boolean): Promise<RecordModel[]> {
        let options: RecordListOptions = {filter: `order_id='${order_id}'`};
        if (has_order) {
            options.sort = "+order";
        }
        let selected = await pb.collection(collection_name).getList(1, 500, options);
        return selected.items;
    }

    function safeGet(map: Map<string, RecordModel[]>, key: string): RecordModel[] {
        let res = map.get(key);
        if (res == undefined) {
            return []
        }
        return res;
    }

    let order: RecordModel,
        formats: RecordModel[] = [],
        page_nums: RecordModel[] = [],
        fastenings: RecordModel[] = [],
        block_papers: RecordModel[] = [],
        block_colors: RecordModel[] = [],
        block_departure_elements: RecordModel[] = [],
        block_printers: RecordModel[] = [],
        cover_papers: RecordModel[] = [],
        cover_colors: RecordModel[] = [],
        cover_departure_elements: RecordModel[] = [],
        cover_printers: RecordModel[] = [],
        cover_laminations: RecordModel[] = [];
    async function update_available_collections(order_id: string) {
        formats = await get_collection(order_id, "available_formats", true);
        page_nums = await get_collection(order_id, "avaliable_page_nums", false);
        fastenings = await get_collection(order_id, "available_fastenings", true);
        block_papers = await get_collection(order_id, "available_block_papers", true);
        block_colors = await get_collection(order_id, "available_block_colors", true);
        block_departure_elements = await get_collection(order_id, "available_block_departure_elements", false);
        block_printers = await get_collection(order_id, "available_block_printers", true);
        cover_papers = await get_collection(order_id, "available_cover_papers", true);
        cover_colors = await get_collection(order_id, "available_cover_colors", true);
        cover_departure_elements = await get_collection(order_id, "available_cover_departure_elements", false);
        cover_printers = await get_collection(order_id, "available_cover_printers", true);
        cover_laminations = await get_collection(order_id, "available_cover_laminations", false);
    }

    onMount(async () => {
        order = await pb.collection("orders").create({});
        await update_available_collections(order.id);
    });

    let orderTitle: string,
        orderExtOrderNum: string,
        orderCirculation: BigInt,
        orderFormatId: string,
        orderPageNum: BigInt,
        orderFasteningId: string,
        orderBlockColorId: string,
        orderCoverColorId: string,
        orderBlockDepartureElements: boolean,
        orderCoverDepartureElements: boolean,
        orderBlockPaperId: string,
        orderCoverPaperId: string,
        orderBlockPrinterId: string,
        orderCoverPrinterId: string,
        orderCoverLamination: boolean,
        coverDisable = false;
    async function update_order() {
        await pb.collection("orders").update(order.id, {
            title: orderTitle,
            ext_order_num: orderExtOrderNum,
            circulation: orderCirculation,
            format: orderFormatId,
            page_num: orderPageNum,
            fastening: orderFasteningId,
            block_color: orderBlockColorId,
            cover_color: orderCoverColorId,
            block_departure_elements: orderBlockDepartureElements,
            cover_departure_elements: orderCoverDepartureElements,
            block_paper: orderBlockPaperId,
            cover_paper: orderCoverPaperId,
            block_printer: orderBlockPrinterId,
            cover_printer: orderCoverPrinterId,
            cover_lamination: orderCoverLamination
        });
        await update_available_collections(order.id);
        let coverPaper = await pb.collection("papers").getOne(orderCoverPaperId);
        coverDisable = coverPaper.is_empty;
    }

    let reportIsFormed = false,
        report_sections_fields: Map<string, RecordModel[]> = new Map(),
        order_report: RecordModel = {
            collectionId: "", collectionName: "", id: "", created: "", updated: ""
        };
    async function submitOrder() {
        const report_fields = await pb.collection("report_fields").getFullList({sort: "+order"});
        report_sections_fields = Map.groupBy(report_fields, ({section}) => section);
        order_report = await pb.collection("orders_reports").getOne(order.id);
        reportIsFormed = true;
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
    <form on:change={update_order} on:submit={submitOrder}>
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
            <select required class="form-control" id="orderFormat" bind:value={orderFormatId}>
                {#each formats as format}
                    <option value="{format.format_id}" disabled="{!format.is_avaliable}">
                        {format.name}{format.non_avaliable_message ? format.non_avaliable_message: ""}
                    </option>
                {/each}
            </select>
        </div>
        <div class="form-group">
            <label for="orderPageNum">Количество страниц</label>
            {#each page_nums as page_num}
                <input required type="number" class="form-control" id="orderPageNum" placeholder="Введите количество страниц"
                    min="{page_num.min}" max="{page_num.max}" step="{page_num.step}" bind:value={orderPageNum}
                >
            {/each}
        </div>
        <div class="form-group">
            <label for="orderFastening">Вид крепления</label>
            <select required class="form-control" id="orderFastening" bind:value={orderFasteningId}>
                {#each fastenings as fastening}
                    <option value="{fastening.fastening_id}" disabled="{!fastening.is_avaliable}">
                        {fastening.name}{fastening.non_avaliable_message ? fastening.non_avaliable_message: ""}
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
                    <select required class="form-control" id="orderBlockPaper" bind:value={orderBlockPaperId}>
                        {#each block_papers as paper}
                            <option value="{paper.paper_id}" disabled="{!paper.is_avaliable}">
                                {paper.name}{paper.non_avaliable_message ? paper.non_avaliable_message: ""}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="form-group">
                    <label for="orderBlockColor">Цветность блока</label>
                    <select required class="form-control" id="orderBlockColor" bind:value={orderBlockColorId}>
                        {#each block_colors as color}
                            <option value="{color.color_id}" disabled="{!color.is_avaliable}">
                                {color.name}{color.non_avaliable_message ? color.non_avaliable_message: ""}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="form-check">
                    {#each block_departure_elements as block_departure_element}
                        <label class="form-check-label" for="orderBlockDepartureElements">Элементы на вылет блока{block_departure_element.non_avaliable_message ? block_departure_element.non_avaliable_message: ""}</label>
                        <input type="checkbox" class="form-check-input" id="orderBlockDepartureElements"
                            disabled="{!block_departure_element.is_avaliable}" bind:checked={orderBlockDepartureElements}
                        >
                    {/each}
                </div>
                <div class="form-group">
                    <label for="orderBlockPrinter">На чём печатать блок</label>
                    <select required class="form-control" id="orderBlockPrinter" bind:value={orderBlockPrinterId}>
                        {#each block_printers as printer}
                            <option value="{printer.printer_id}" disabled="{!printer.is_avaliable}">
                                {printer.name}{printer.non_avaliable_message ? printer.non_avaliable_message: ""}
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
                    <select required class="form-control" id="orderCoverPaper" bind:value={orderCoverPaperId}>
                        {#each cover_papers as paper}
                            <option value="{paper.paper_id}" disabled="{!paper.is_avaliable}">
                                {paper.name}{paper.non_avaliable_message ? paper.non_avaliable_message: ""}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="form-group">
                    <label for="orderCoverColor">Цветность обложки</label>
                    <select required class="form-control" id="orderCoverColor" disabled="{coverDisable}" bind:value={orderCoverColorId}>
                        {#each cover_colors as color}
                            <option value="{color.color_id}" disabled="{!color.is_avaliable}">
                                {color.name}{color.non_avaliable_message ? color.non_avaliable_message: ""}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="form-check">
                    {#each cover_departure_elements as cover_departure_element}
                        <label class="form-check-label" for="orderCoverDepartureElements">Элементы на вылет обложки{cover_departure_element.non_avaliable_message ? cover_departure_element.non_avaliable_message: ""}</label>
                        <input type="checkbox" class="form-check-input" id="orderCoverDepartureElements"
                            disabled="{!cover_departure_element.is_avaliable || coverDisable}" bind:checked={orderCoverDepartureElements}
                        >
                    {/each}
                </div>
                <div class="form-group">
                    <label for="orderCoverPrinter">На чём печатать обложку</label>
                    <select required class="form-control" id="orderCoverPrinter" disabled="{coverDisable}" bind:value={orderCoverPrinterId}>
                        {#each cover_printers as printer}
                            <option value="{printer.printer_id}" disabled="{!printer.is_avaliable}">
                                {printer.name}{printer.non_avaliable_message ? printer.non_avaliable_message: ""}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="form-check">
                    {#each cover_laminations as cover_lamination}
                        <label class="form-check-label" for="orderCoverLamination">Ламинация обложки{cover_lamination.non_avaliable_message ? cover_lamination.non_avaliable_message: ""}</label>
                        <input type="checkbox" class="form-check-input" id="orderCoverLamination"
                            disabled="{!cover_lamination.is_avaliable || coverDisable}" bind:checked={orderCoverLamination}
                        >
                    {/each}
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Рассчитать заказ</button>
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