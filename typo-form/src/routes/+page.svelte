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
        cover_laminations: RecordModel[] = [],
        cover_creasing: RecordModel[] = [],
        cover_folding: RecordModel[] = [];
    async function update_available_collections(order_id: string) {
        formats = await get_collection(order_id, "available_formats", true);
        fastening_full = await get_collection(order_id, "available_fastening_full", false);
        fastenings = await get_collection(order_id, "available_fastenings", true);
        page_nums = await get_collection(order_id, "available_page_nums", false);
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
        cover_creasing = await get_collection(order_id, "available_cover_creasing", false);
        cover_folding = await get_collection(order_id, "available_cover_folding", false);
    }

    onMount(async () => {
        order_types = await pb.collection("available_order_types").getFullList();
    });

    let orderTitle: string,
        orderExtOrderNum: string,
        orderTypeId: string;
    async function createOrderOrUpdateType() {
        let orderParams = {
            title: orderTitle,
            ext_order_num: orderExtOrderNum,
            type: orderTypeId
        }
        if (!order) {
            order = await pb.collection("orders").create(orderParams);
        } else {
            await pb.collection("orders").update(order.id, orderParams);
        }
        await update_available_collections(order.id);
    }

    let orderCirculation: BigInt,
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
        orderCoverLaminationId: string,
        orderCoverCreasing: boolean,
        orderCoverFolding: boolean;
    async function updateOrder() {
        if (!order) {
            return
        }
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
            cover_lamination: orderCoverLaminationId,
            cover_creasing: orderCoverCreasing,
            cover_folding: orderCoverFolding
        });
        await update_available_collections(order.id);
    }

    let loadOrderId: string,
        orderLoadedFromId: Boolean = false;
    async function loadOrderById() {
        orderLoadedFromId = true;
        order = await pb.collection("orders").getOne(loadOrderId);
        orderTitle = order.title;
        orderExtOrderNum = order.ext_order_num;
        orderTypeId = order.type;
        orderCirculation = order.circulation;
        orderFormatId = order.format;
        orderPageNum = order.page_num;
        orderFasteningId = order.fastening;
        orderBlockColorId = order.block_color;
        orderCoverColorId = order.cover_color;
        orderBlockDepartureElements = order.block_departure_elements;
        orderCoverDepartureElements = order.cover_departure_elements;
        orderBlockPaperId = order.block_paper;
        orderCoverPaperId = order.cover_paper;
        orderBlockPrinterId = order.block_printer;
        orderCoverPrinterId = order.cover_printer;
        orderCoverLaminationId = order.cover_lamination;
        orderCoverCreasing = order.cover_creasing;
        orderCoverFolding = order.cover_folding;
        await update_available_collections(order.id);
        submitOrder();
    }

    let reportIsFormed = false,
        report_fields_sections: (ReportFieldsSection|null)[] = [];
    async function submitOrder() {
        reportIsFormed = false;
        let report_sections: RecordModel[] = await pb.collection("report_sections").getFullList({sort: "+order"});
        let materialsFullSum: number = 0,
            worksFullSum:     number = 0;
        let report_fields_sections_promices = report_sections.map(async (report_section) => {
            if (report_section.collection_name) {
                let retport_fields = await pb.collection(report_section.collection_name).getList(1, 500, {
                    filter: `section_id='${report_section.id}' && order_id='${order.id}'`,
                    sort: "+order",
                    requestKey: report_section.id
                });
                let retport_fields_items = retport_fields.items;
                
                if (report_section.id === "000006_materals") {
                    materialsFullSum = retport_fields_items.reduce((sum, current) => current.cost !== '' ? sum + current.cost : sum, 0);
                    retport_fields_items.push({
                        collectionId:   report_section.collection_name,
                        collectionName: report_section.collection_name,
                        created: 'none',
                        updated: 'none',
                        
                        id: `${order.id}_material_summ`,
                        order_id: order.id,
                        section_id: report_section.id,
                        order: 150,
                        name: 'Итого',
                        value: '',
                        units: '',
                        rate:  '',
                        cost: materialsFullSum.toFixed(0)
                    })
                }
                
                if (report_section.id === "000000007_works") {
                    worksFullSum = retport_fields_items.reduce((sum, current) => current.cost !== '' ? sum + current.cost : sum, 0);
                    retport_fields_items.push({
                        collectionId:   report_section.collection_name,
                        collectionName: report_section.collection_name,
                        created: 'none',
                        updated: 'none',
                        
                        id: `${order.id}_works_summ`,
                        order_id: order.id,
                        section_id: report_section.id,
                        order: 310,
                        name: 'Итого',
                        value: '',
                        units: '',
                        rate:  '',
                        cost: worksFullSum.toFixed(0)
                    })
                }

                if (retport_fields_items.length > 0) {
                    return {
                        section: report_section,
                        fields: retport_fields_items
                    };
                }
            }
            return null
        });
        report_fields_sections = await Promise.all(report_fields_sections_promices);
        let report_section_profit = report_sections.find((current) => {return current.id === "00000008_profit"});
        let order_estimated_circulation = await pb.collection("orders_estimated_circulation").getOne(order.id);
        if (report_section_profit) {
            report_fields_sections.push({
                section: report_section_profit,
                fields: [
                    {
                        collectionId:   report_section_profit.collection_name,
                        collectionName: report_section_profit.collection_name,
                        created: 'none',
                        updated: 'none',
                        
                        id: `${order.id}_full_summ`,
                        order_id: order.id,
                        section_id: report_section_profit.id,
                        order: 400,
                        name: 'Общая стоимость',
                        value: '',
                        units: '',
                        rate:  '',
                        cost: (materialsFullSum+worksFullSum*7).toFixed(0)
                    },
                    {
                        collectionId:   report_section_profit.collection_name,
                        collectionName: report_section_profit.collection_name,
                        created: 'none',
                        updated: 'none',
                        
                        id: `${order.id}_full_summ`,
                        order_id: order.id,
                        section_id: report_section_profit.id,
                        order: 401,
                        name: 'Стоимость одного экземпляра',
                        value: '',
                        units: '',
                        rate:  '',
                        cost: ((materialsFullSum+worksFullSum*7.0)/order_estimated_circulation.estimated_circulation).toFixed(0)
                    }
                ]
            });
        }
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

<div id="orderBase" class="container">
    <h1>Калькулятор заказов типографии</h1>
    <hr>
    <div class="row">
        <div class="col">
            <form on:submit={createOrderOrUpdateType} id="createOrderOrUpdateType">
                <div class="form-group">
                    <label for="orderTitle">Название заказа</label>
                    <input required type="text" class="form-control" id="orderTitle" placeholder="Введите название заказа" bind:value={orderTitle}>
                </div>
                <div class="form-group">
                    <label for="orderExtOrderNum">Номер заказа</label>
                    <input required type="text" class="form-control" id="orderExtOrderNum" placeholder="Введите номер заказа" bind:value={orderExtOrderNum}>
                </div>
            </form>
        </div>
        <div class="col">
            <form on:submit={loadOrderById}>
                <div class="form-group">
                    <label for="loadOrderId">Загрузить заказ по идентификатору</label>
                    <input required type="text" class="form-control" id="loadOrderId" placeholder="Введите идентификатор заказа" bind:value={loadOrderId}>
                </div>
                <button type="submit" class="btn btn-warning">Загрузить заказ</button>
                <button on:click={() => location.reload()} class="btn btn-danger" disabled={!orderLoadedFromId}>Очистить форму</button>
                <br/>
                <span>Учитывайте, что после загрузки заказа будет обновлена вся страница</span>
            </form>
        </div>
    </div>
    {#each order_types as order_type}
        <button 
            type="submit"
            class="btn btn-{orderTypeId != order_type.id ? 'primary' : 'secondary'}"
            on:click={() => {orderTypeId = order_type.id}}
            disabled="{!order_type.is_available}"
            form="createOrderOrUpdateType"
        >
            {order_type.name}{order_type.non_available_message}
        </button>
        &nbsp;
    {/each}
</div>

{#if order}
    <div id="orderFields" class="container">
        <form on:change={updateOrder} on:submit={submitOrder}>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="orderCirculation">Тираж</label>
                        <input required type="number" class="form-control" id="orderCirculation" placeholder="Введите тираж" min="1" bind:value={orderCirculation}>
                    </div>
                    <div class="form-group">
                        <label for="orderFormat">Формат</label>
                        <select required class="form-control" id="orderFormat" bind:value={orderFormatId}>
                            <option disabled selected value> -- выберите -- </option>
                            {#each formats as format}
                                <option value="{format.format_id}" disabled="{!format.is_available}">
                                    {format.name}{format.non_available_message}
                                </option>
                            {/each}
                        </select>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        {#each page_nums as page_num}
                            <label for="orderPageNum">Количество страниц блока{page_num.non_available_message}</label>
                            <input required type="number" class="form-control" id="orderPageNum" placeholder="Введите количество страниц"
                                min="{page_num.min}" max="{page_num.max}" step="{page_num.step}" disabled="{!page_num.is_available}" bind:value={orderPageNum}
                            >
                        {/each}
                    </div>
                    <div class="form-group">
                        {#each fastening_full as fastening_full_}
                            <label for="orderFastening">Вид крепления{fastening_full_.non_available_message}</label>
                            <select required class="form-control" id="orderFastening" disabled="{!fastening_full_.is_available}" bind:value={orderFasteningId}>
                                <option disabled selected value> -- выберите -- </option>
                                {#each fastenings as fastening}
                                    <option value="{fastening.fastening_id}" disabled="{!fastening.is_available}">
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
                                        <option value="{paper.paper_id}" disabled="{!paper.is_available}">
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
                                        <option value="{color.color_id}" disabled="{!color.is_available}">
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
                                        disabled="{!block_departure_element.is_available || !block_.is_available}" bind:checked={orderBlockDepartureElements}
                                    >
                                {/each}
                            </div>
                            <div class="form-group">
                                <label for="orderBlockPrinter">На чём печатать</label>
                                <select required class="form-control" id="orderBlockPrinter" bind:value={orderBlockPrinterId}>
                                    <option disabled selected value> -- выберите -- </option>
                                    {#each block_printers as printer}
                                        <option value="{printer.printer_id}" disabled="{!printer.is_available}">
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
                                    <option value="{paper.paper_id}" disabled="{!paper.is_available}">
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
                                    <option value="{color.color_id}" disabled="{!color.is_available}">
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
                                    disabled="{!cover_departure_element.is_available || !cover_.is_available}" bind:checked={orderCoverDepartureElements}
                                >
                            {/each}
                        </div>
                        <div class="form-group">
                            <label for="orderCoverPrinter">На чём печатать{cover_.non_available_message}</label>
                            <select required class="form-control" id="orderCoverPrinter" disabled="{!cover_.is_available}" bind:value={orderCoverPrinterId}>
                                <option disabled selected value> -- выберите -- </option>
                                {#each cover_printers as printer}
                                    <option value="{printer.printer_id}" disabled="{!printer.is_available}">
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
                                    <option value="{cover_lamination.cover_lamination_id}" disabled="{!cover_lamination.is_available}">
                                        {cover_lamination.name}{cover_lamination.non_available_message}
                                    </option>
                                {/each}
                            </select>
                        </div>
                        <div class="form-check">
                            {#each cover_folding as cover_folding_}
                                <label class="form-check-label" for="orderCoverFolding">
                                    Фальцовка{cover_folding_.non_available_message}{cover_.non_available_message}
                                </label>
                                <input type="checkbox" class="form-check-input" id="orderCoverFolding"
                                    disabled="{!cover_folding_.is_available || !cover_.is_available}" bind:checked={orderCoverFolding}
                                >
                            {/each}
                        </div>
                        <div class="form-check">
                            {#each cover_creasing as cover_creasing}
                                <label class="form-check-label" for="orderCoverCreasing">
                                    Биговка{cover_creasing.non_available_message}{cover_.non_available_message}
                                </label>
                                <input type="checkbox" class="form-check-input" id="orderCoverCreasing"
                                    disabled="{!cover_creasing.is_available || !cover_.is_available}" bind:checked={orderCoverCreasing}
                                >
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Рассчитать заказ</button>
            <button on:click={() => location.reload()} class="btn btn-warning" disabled={!reportIsFormed}>Очистить форму</button>
        </form>
    </div>
{/if}

{#if reportIsFormed}
    <div id="orderReport" class="container">
        <div class="row" transition:fade>
            <div class="col">
                <h2>Итог расчёта</h2>
                <button class="btn btn-success btn-sm" on:click={saveOrderReportAsExcel}>Сохранить как XLSX</button>
                <hr>
                <table id="orderReportTable" class="table table-bordered table-hover table-sm">
                    <tbody>
                        {#each report_fields_sections as report_fields_section}
                            {#if report_fields_section}
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
                            {/if}
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="col" />
        </div>
    </div>
{/if}