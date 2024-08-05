<svelte:head>
    <title>Калькулятор заказов типографии</title>
</svelte:head>

<script lang="ts">
    import { onMount } from "svelte";
    import PocketBase from "pocketbase";
    import type { RecordModel, RecordListOptions } from "pocketbase";
    import { fade } from "svelte/transition";
    import * as XLSX from 'xlsx';

    class ReportFieldsSection {
        section!: RecordModel;
        fields!: RecordModel[];
    }

    const pb = new PocketBase(`${location.protocol}//${location.host}`);

    async function get_collection(order_id: string , collection_name: string, has_order: boolean): Promise<RecordModel[]> {
        let options: RecordListOptions = {filter: `order_id='${order_id}'`};
        if (has_order) {
            options.sort = "+order";
        }
        let selected = await pb.collection(collection_name).getList(1, 500, options);
        return selected.items;
    }

    let order: RecordModel,
        order_types: RecordModel[] = [],
        formats: RecordModel[] = [],
        page_nums: RecordModel[] = [],
        fastening_full: RecordModel[] = [],
        fastenings: RecordModel[] = [],
        block: RecordModel[] = [],
        block_papers: RecordModel[] = [],
        block_colors: RecordModel[] = [],
        block_departure_elements: RecordModel[] = [],
        block_printers: RecordModel[] = [],
        cover: RecordModel[] = [],
        cover_papers: RecordModel[] = [],
        cover_colors: RecordModel[] = [],
        cover_departure_elements: RecordModel[] = [],
        cover_printers: RecordModel[] = [],
        cover_laminations: RecordModel[] = [];
    async function update_available_collections(order_id: string) {
        order_types = await get_collection(order_id, "available_order_types", true);
        formats = await get_collection(order_id, "available_formats", true);
        fastening_full = await get_collection(order_id, "available_fastening_full", false);
        fastenings = await get_collection(order_id, "available_fastenings", true);
        page_nums = await get_collection(order_id, "avaliable_page_nums", false);
        block = await get_collection(order_id, "available_block", false);
        block_papers = await get_collection(order_id, "available_block_papers", true);
        block_colors = await get_collection(order_id, "available_block_colors", true);
        block_departure_elements = await get_collection(order_id, "available_block_departure_elements", false);
        block_printers = await get_collection(order_id, "available_block_printers", true);
        cover = await get_collection(order_id, "available_cover", false);
        cover_papers = await get_collection(order_id, "available_cover_papers", true);
        cover_colors = await get_collection(order_id, "available_cover_colors", true);
        cover_departure_elements = await get_collection(order_id, "available_cover_departure_elements", false);
        cover_printers = await get_collection(order_id, "available_cover_printers", true);
        cover_laminations = await get_collection(order_id, "available_cover_laminations", true);
    }

    onMount(async () => {
        order = await pb.collection("orders").create({});
        await update_available_collections(order.id);
    });

    let orderTitle: string,
        orderExtOrderNum: string,
        orderTypeId: string,
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
        orderCoverLaminationId: string;
    async function update_order() {
        await pb.collection("orders").update(order.id, {
            title: orderTitle,
            ext_order_num: orderExtOrderNum,
            type: orderTypeId,
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
            cover_lamination: orderCoverLaminationId
        });
        await update_available_collections(order.id);
    }

    let reportIsFormed = false,
        report_fields_sections: ReportFieldsSection[] = [];
    async function submitOrder() {
        let report_sections: RecordModel[] = await pb.collection("report_sections").getFullList({sort: "+order"});
        var report_fields_sections_tmp: ReportFieldsSection[] = [];
        for (let i=0; i<report_sections.length; i++) {
            let report_section = report_sections[i]
            let retport_fields = await pb.collection("report_fields").getList(1, 500, {
                filter: `section_id='${report_section.id}' && order_id='${order.id}'`,
                sort: "+order"
            });
            let retport_fields_items = retport_fields.items;
            if (retport_fields_items.length > 0) {
                report_fields_sections_tmp.push({
                    section: report_section,
                    fields: retport_fields_items
                });
            }
        }
        report_fields_sections = report_fields_sections_tmp
        reportIsFormed = true;
        location.href = location.href.split("#")[0] + "#orderReport";
    }

    function saveOrderReportAsExcel() {
        const table = document.getElementById("orderReportTable");
        const tableName = `${orderExtOrderNum}-${orderTitle}`
        const wb = XLSX.utils.table_to_book(table, {sheet: orderExtOrderNum});
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
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label for="orderExtOrderNum">Номер заказа</label>
                    <input required type="text" class="form-control" id="orderExtOrderNum" placeholder="Введите номер заказа" bind:value={orderExtOrderNum}>
                </div>
                <div class="form-group">
                    <label for="orderCirculation">Тираж</label>
                    <input required type="number" class="form-control" id="orderCirculation" placeholder="Введите тираж" min="1" bind:value={orderCirculation}>
                </div>
                <div class="form-group">
                    {#each page_nums as page_num}
                        <label for="orderPageNum">Количество страниц блока{page_num.non_available_message}</label>
                        <input required type="number" class="form-control" id="orderPageNum" placeholder="Введите количество страниц"
                            min="{page_num.min}" max="{page_num.max}" step="{page_num.step}" disabled="{!page_num.is_avaliable}" bind:value={orderPageNum}
                        >
                    {/each}
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="orderType">Вид изделия</label>
                    <select required class="form-control" id="orderType" bind:value={orderTypeId}>
                        <option disabled selected value> -- выберите -- </option>
                        {#each order_types as order_type}
                            <option value="{order_type.order_type_id}" disabled="{!order_type.is_avaliable}">
                                {order_type.name}{order_type.non_available_message}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="form-group">
                    <label for="orderFormat">Формат</label>
                    <select required class="form-control" id="orderFormat" bind:value={orderFormatId}>
                        <option disabled selected value> -- выберите -- </option>
                        {#each formats as format}
                            <option value="{format.format_id}" disabled="{!format.is_avaliable}">
                                {format.name}{format.non_available_message}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="form-group">
                    {#each fastening_full as fastening_full_}
                        <label for="orderFastening">Вид крепления{fastening_full_.non_available_message}</label>
                        <select required class="form-control" id="orderFastening" disabled="{!fastening_full_.is_available}" bind:value={orderFasteningId}>
                            <option disabled selected value> -- выберите -- </option>
                            {#each fastenings as fastening}
                                <option value="{fastening.fastening_id}" disabled="{!fastening.is_avaliable}">
                                    {fastening.name}{fastening.non_available_message}
                                </option>
                            {/each}
                        </select>
                    {/each}
                </div>
            </div>
        </div>
        <div class="row">
            {#each block as block_}
                {#if block_.is_available}
                    <div class="col">
                        <h3>Блок</h3>
                        <hr>
                        <div class="form-group">
                            <label for="orderBlockPaper">Бумага</label>
                            <select required class="form-control" id="orderBlockPaper" bind:value={orderBlockPaperId}>
                                <option disabled selected value> -- выберите -- </option>
                                {#each block_papers as paper}
                                    <option value="{paper.paper_id}" disabled="{!paper.is_avaliable}">
                                        {paper.name}{paper.non_available_message}
                                    </option>
                                {/each}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="orderBlockColor">Цветность</label>
                            <select required class="form-control" id="orderBlockColor" bind:value={orderBlockColorId}>
                                <option disabled selected value> -- выберите -- </option>
                                {#each block_colors as color}
                                    <option value="{color.color_id}" disabled="{!color.is_avaliable}">
                                        {color.name}{color.non_available_message}
                                    </option>
                                {/each}
                            </select>
                        </div>
                        <div class="form-check">
                            {#each block_departure_elements as block_departure_element}
                                <label class="form-check-label" for="orderBlockDepartureElements">
                                    Элементы на вылет{block_departure_element.non_available_message}
                                </label>
                                <input type="checkbox" class="form-check-input" id="orderBlockDepartureElements"
                                    disabled="{!block_departure_element.is_avaliable || !block_.is_available}" bind:checked={orderBlockDepartureElements}
                                >
                            {/each}
                        </div>
                        <div class="form-group">
                            <label for="orderBlockPrinter">На чём печатать</label>
                            <select required class="form-control" id="orderBlockPrinter" bind:value={orderBlockPrinterId}>
                                <option disabled selected value> -- выберите -- </option>
                                {#each block_printers as printer}
                                    <option value="{printer.printer_id}" disabled="{!printer.is_avaliable}">
                                        {printer.name}{printer.non_available_message}
                                    </option>
                                {/each}
                            </select>
                        </div>
                    </div>
                {/if}
            {/each}
            <div class="col">
                {#each cover as cover_}
                    <h3>{cover_.cover_name}</h3>
                    <hr>
                    <div class="form-group">
                        <label for="orderCoverPaper">Бумага{cover_.full_non_available_message}</label>
                        <select required class="form-control" id="orderCoverPaper" disabled="{!cover_.full_is_available}" bind:value={orderCoverPaperId}>
                            <option disabled selected value> -- выберите -- </option>
                            {#each cover_papers as paper}
                                <option value="{paper.paper_id}" disabled="{!paper.is_avaliable}">
                                    {paper.name}{paper.non_available_message}
                                </option>
                            {/each}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="orderCoverColor">Цветность{cover_.non_available_message}</label>
                        <select required class="form-control" id="orderCoverColor" disabled="{!cover_.is_available}" bind:value={orderCoverColorId}>
                            <option disabled selected value> -- выберите -- </option>
                            {#each cover_colors as color}
                                <option value="{color.color_id}" disabled="{!color.is_avaliable}">
                                    {color.name}{color.non_available_message}
                                </option>
                            {/each}
                        </select>
                    </div>
                    <div class="form-check">
                        {#each cover_departure_elements as cover_departure_element}
                            <label class="form-check-label" for="orderCoverDepartureElements">
                                Элементы на вылет{cover_departure_element.non_available_message}{cover_.non_available_message}
                            </label>
                            <input type="checkbox" class="form-check-input" id="orderCoverDepartureElements"
                                disabled="{!cover_departure_element.is_avaliable || !cover_.is_available}" bind:checked={orderCoverDepartureElements}
                            >
                        {/each}
                    </div>
                    <div class="form-group">
                        <label for="orderCoverPrinter">На чём печатать{cover_.non_available_message}</label>
                        <select required class="form-control" id="orderCoverPrinter" disabled="{!cover_.is_available}" bind:value={orderCoverPrinterId}>
                            <option disabled selected value> -- выберите -- </option>
                            {#each cover_printers as printer}
                                <option value="{printer.printer_id}" disabled="{!printer.is_avaliable}">
                                    {printer.name}{printer.non_available_message}
                                </option>
                            {/each}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-check-label" for="orderCoverLamination">Ламинация{cover_.non_available_message}</label>
                        <select required class="form-control" id="orderCoverLamination" disabled="{!cover_.is_available}" bind:value={orderCoverLaminationId}>
                            <option disabled selected value> -- выберите -- </option>
                            {#each cover_laminations as cover_lamination}
                                <option value="{cover_lamination.cover_lamination_id}" disabled="{!cover_lamination.is_avaliable}">
                                    {cover_lamination.name}{cover_lamination.non_available_message}
                                </option>
                            {/each}
                        </select>
                    </div>
                {/each}
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Рассчитать заказ</button>
        <button on:click={() => location.reload()} class="btn btn-warning" disabled={!reportIsFormed}>Очистить форму</button>
    </form>
</div>

<div class="container" id="orderReport">
    {#if reportIsFormed}
        <div class="row" transition:fade>
            <div class="col">
                <h2>Итог расчёта</h2>
                <button class="btn btn-success btn-sm" on:click={saveOrderReportAsExcel}>Сохранить как XLSX</button>
                <hr>
                <table id="orderReportTable" class="table table-bordered table-hover table-sm">
                    <tbody>
                        {#each report_fields_sections as report_fields_section}
                            <tr>
                                <th colspan="5" style="padding-bottom: 0" class="table-secondary border-ligh">{report_fields_section.section.name}</th>
                            </tr>
                            {#if report_fields_section.section.has_units && report_fields_section.section.has_rate}
                                <tr>
                                    <th>Название</th>
                                    <th>Значение</th>
                                    <th>Ед.измерения</th>
                                    <th>{report_fields_section.section.price_name}</th>
                                    <th>Затраты</th>
                                </tr>
                            {:else if report_fields_section.section.has_units && !report_fields_section.section.has_rate}
                            <tr>
                                <th colspan="2">Название</th>
                                <th colspan="2">Значение</th>
                                <th>Ед.измерения</th>
                            </tr>
                            {/if}
                            {#each report_fields_section.fields as report_field}
                                {#if report_fields_section.section.has_units && report_fields_section.section.has_rate}
                                    <tr>
                                        <th>{report_field.name}</th>
                                        <td>{report_field.value}</td>
                                        <td>{report_field.units}</td>
                                        <td>{report_field.rate}</td>
                                        <td>{report_field.cost}</td>
                                    </tr>
                                {:else if report_fields_section.section.has_units && !report_fields_section.section.has_rate}
                                    <tr>
                                        <th colspan="2">{report_field.name}</th>
                                        <td colspan="2">{report_field.value}</td>
                                        <td>{report_field.units}</td>
                                    </tr>
                                {:else if !report_fields_section.section.has_units && !report_fields_section.section.has_rate}
                                    <tr>
                                        <th colspan="2">{report_field.name}</th>
                                        <td colspan="3">{report_field.value}</td>
                                    </tr>
                                {/if}
                            {/each}
                            <tr><th colspan="5"/></tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="col" />
        </div>
    {/if}
</div>