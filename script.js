//-------------------------------------------------------------------------------------------------------------//
function addValuesToBtn({ arr: arr, btn: btn, div_class: div_class, div: div }) {
    arr.forEach((name, index) => {
        if (index == 0) {
            let name_1 = "Select All";
            var label = document.createElement('label');
            var input = document.createElement('input');
            var span = document.createElement('span');

            label.setAttribute('for', div_class + " " + name_1);
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', div_class + " " + name_1);
            input.setAttribute('value', name_1);
            input.classList.add('ckkBox');
            input.classList.add('all')
            span.textContent = name_1;

            label.appendChild(input);
            label.appendChild(span);
            label.innerHTML += '<br>';
            div.appendChild(label);
        }
        let name_1 = name;
        var label = document.createElement('label');
        var input = document.createElement('input');
        var span = document.createElement('span');

        label.setAttribute('for', name_1);
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', name_1);
        input.setAttribute('value', name_1);
        input.classList.add('ckkBox');
        input.classList.add('val');
        span.textContent = name_1;

        label.appendChild(input);
        label.appendChild(span);
        // label.innerHTML += '<br>';
        div.appendChild(label);
    });

    btn.addEventListener('click', (e) => {
        let check = document.querySelector('.' + div_class + " .checkboxes");
        check.classList.toggle('active');
    });

    // btn.addEventListener('mouseover', (e) => {
    //     let check = document.querySelector('.' + div_class + " .checkboxes");
    //     check.classList.add('active');
    // });

    // document.querySelector('.' + div_class + " .checkboxes").addEventListener('mouseleave', (e) => {
    //     let check = document.querySelector('.' + div_class + " .checkboxes");
    //     check.classList.remove('active');
    // });

    var checkboxUnTicked = document.querySelectorAll('.' + div_class + ' #Categories .ckkBox.val');
    var checkBoxAll = document.querySelector('.' + div_class + ' .all');

    for (let i = 0; i < checkboxUnTicked.length; i++) {
        checkboxUnTicked[i].addEventListener('click', function () {
            const select = document.querySelectorAll('.' + div_class + ' #Categories .ckkBox.val:checked')
            if (select.length == checkboxUnTicked.length) {
                checkBoxAll.checked = true;
            } else checkBoxAll.checked = false;
        });
    }

    checkBoxAll.addEventListener('click', function () {
        if (checkBoxAll.checked == true) {
            checkboxUnTicked.forEach((s) => s.checked = true);
        } else checkboxUnTicked.forEach((s) => s.checked = false);
    });
}
//-------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------//
const week_div = document.querySelector('.weeks .inner-wrap');
const weekBtn = document.querySelector('.week-btn');
//-------------------------------------------------------------------------------------------------------------//
const price_seg_div = document.querySelector('.price-seg .inner-wrap');
const price_segBtn = document.querySelector('.price-seg-btn');
//-------------------------------------------------------------------------------------------------------------//
const vendor_div = document.querySelector('.vendor .inner-wrap');
const vendorBtn = document.querySelector('.vendor-btn');
//-------------------------------------------------------------------------------------------------------------//
const tariff_seg_div = document.querySelector('.tariff-seg .inner-wrap');
const tariff_segBtn = document.querySelector('.tariff-seg-btn');
//-------------------------------------------------------------------------------------------------------------//
const tariff_type_div = document.querySelector('.tariff-type .inner-wrap');
const tariff_typeBtn = document.querySelector('.tariff-type-btn');
//-------------------------------------------------------------------------------------------------------------//
const tco_div = document.querySelector('.tco .inner-wrap');
const tcoBtn = document.querySelector('.tco-btn');
//-------------------------------------------------------------------------------------------------------------//
const year_div = document.querySelector('.year .inner-wrap');
const yearBtn = document.querySelector('.year-btn');
//-------------------------------------------------------------------------------------------------------------//
const submitBtn = document.querySelector('.submit-btn');
//-------------------------------------------------------------------------------------------------------------//
const container_chart = document.querySelector('.container-chart');
const tables = document.querySelector('.tables');
//-------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------//
fetch("./data.csv").then(dataA => dataA.text()).then(dataA => {
    const dataArr = dataA.trim().split("\n").map(row => row.replace("\r", "").split(",")).slice(1);
    let filterArr = filterArrForOptions = dataArr;
    console.log([...new Set(dataArr.map(row => row.length))]);

    function addAndUpdate(rowNumber, div_class, div, btn) {
        let arr = [...new Set(filterArrForOptions.map(row => row[rowNumber]))];
        addValuesToBtn({ arr: arr, btn: btn, div_class: div_class, div: div });
        btn.addEventListener('click', (e) => {
            let event = document.querySelectorAll('.' + div_class + ' .ckkBox.val:checked');
            let eventArr = [];
            event.forEach((s) => eventArr.push(s.value));
            if (eventArr.length >= 1) {
                let temp = filterArrForOptions.filter(row => eventArr.includes(row[rowNumber]));
                filterArrForOptions = temp;
            }
        });
    }

    addAndUpdate(1, 'weeks', week_div, weekBtn);
    addAndUpdate(8, 'price-seg', price_seg_div, price_segBtn);
    addAndUpdate(4, 'vendor', vendor_div, vendorBtn);
    addAndUpdate(11, 'tariff-seg', tariff_seg_div, tariff_segBtn);
    addAndUpdate(10, 'tariff-type', tariff_type_div, tariff_typeBtn);

    // let tcoArr = ['Calculated TCO', 'Calculated TCO TI'];
    let tcoArr = [];
    addValuesToBtn({ arr: tcoArr, btn: tcoBtn, div_class: 'tco', div: tco_div });

    let year = [...new Set(filterArrForOptions.map(row => row[0].split(" ")[2]))];
    addValuesToBtn({ arr: year, btn: yearBtn, div_class: 'year', div: year_div });

    yearBtn.addEventListener('click', (e) => {
        let year = document.querySelectorAll('.year .ckkBox.val:checked');
        let yearArr = [];
        year.forEach((s) => yearArr.push(s.value));
        if (yearArr.length >= 1) {
            let temp = filterArrForOptions.filter(row => yearArr.includes(row[0].split(" ")[2]));
            filterArrForOptions = temp;
        }
    });

    submitBtn.addEventListener('click', (e) => {
        var weekChecked = document.querySelectorAll('.weeks #Categories .ckkBox.val:checked');
        var price_segChecked = document.querySelectorAll('.price-seg #Categories .ckkBox.val:checked');
        var vendorChecked = document.querySelectorAll('.vendor #Categories .ckkBox.val:checked');
        var tariff_segChecked = document.querySelectorAll('.tariff-seg #Categories .ckkBox.val:checked');
        var tariff_typeChecked = document.querySelectorAll('.tariff-type #Categories .ckkBox.val:checked');
        var tcoChecked = document.querySelectorAll('.tco #Categories .ckkBox.val:checked');
        var yearChecked = document.querySelectorAll('.year #Categories .ckkBox.val:checked');

        var weekCheckedArr = [], price_segCheckedArr = [], vendorCheckedArr = [], tariff_segCheckedArr = [], tariff_typeCheckedArr = [], tcoCheckedArr = [], yearCheckedArr = [];

        weekChecked.forEach((s) => weekCheckedArr.push(s.value));
        price_segChecked.forEach((s) => price_segCheckedArr.push(s.value));
        vendorChecked.forEach((s) => vendorCheckedArr.push(s.value));
        tariff_segChecked.forEach((s) => tariff_segCheckedArr.push(s.value));
        tariff_typeChecked.forEach((s) => tariff_typeCheckedArr.push(s.value));
        tcoChecked.forEach((s) => tcoCheckedArr.push(s.value));
        yearChecked.forEach((s) => yearCheckedArr.push(s.value));

        console.log(weekCheckedArr, price_segCheckedArr, vendorCheckedArr, tariff_segCheckedArr, tariff_typeCheckedArr, tcoCheckedArr, yearCheckedArr);

        if (tcoCheckedArr.length > 1) return alert('Please select only one TCO');

        var filteredData = filterArr.filter(row => {
            return weekCheckedArr.includes(row[1]) &&
                price_segCheckedArr.includes(row[8]) &&
                vendorCheckedArr.includes(row[4]) &&
                tariff_segCheckedArr.includes(row[11]) &&
                tariff_typeCheckedArr.includes(row[10]) &&
                yearCheckedArr.includes(row[0].split(" ")[2]);
        });

        // console.log(filteredData);

        container_chart.innerHTML = '';
        let colorForYear = ['#e8b206', '#1c9e4b', '#e84b1c', '#1c4be8', '#e81c9e', '#4be81c', '#9e1ce8', '#1ce89e', '#4b1ce8', '#e89e1c', '#1ce84b', '#e84be1', '#9e4be8', '#4be89e', '#e81c4b', '#1c9ee8', '#e89e4b', '#1c4be8', '#e81c9e', '#4be81c', '#9e1ce8', '#1ce89e', '#4b1ce8', '#e89e1c', '#1ce84b', '#e84be1', '#9e4be8', '#4be89e', '#e81c4b', '#1c9ee8', '#e89e4b', '#1c4be8', '#e81c9e', '#4be81c', '#9e1ce8', '#1ce89e', '#4b1ce8', '#e89e1c', '#1ce84b', '#e84be1', '#9e4be8', '#4be89e', '#e81c4b', '#1c9ee8', '#e89e4b', '#1c4be8', '#e81c9e', '#4be81c', '#9e1ce8', '#1ce89e', '#4b1ce8', '#e89e1c', '#1ce84b', '#e84be1', '#9e4be8', '#4be89e', '#e81c4b', '#1c9ee8', '#e89e4b', '#1c4be8', '#e81c9e', '#4be81c', '#9e1ce8', '#1ce89e', '#4b1ce8', '#e89e1c', '#1ce84b', '#e84be1', '#9e4be8', '#4be89e', '#e81c4b', '#1c9ee8', '#e89e4b', '#1c4be8', '#e81c9e', '#4be81c', '#9e1ce8',];

        yearCheckedArr.forEach((year, indexYear) => {
            const div_outer = document.createElement('div');
            const h4 = document.createElement('h4');
            h4.innerHTML = year;
            div_outer.appendChild(h4);
            div_outer.className = 'week-group';

            const main_tray = document.createElement('div');
            main_tray.className = 'main-tray';
            div_outer.appendChild(main_tray);
            container_chart.appendChild(div_outer);

            weekCheckedArr.forEach((week, index) => {
                let tco = tcoCheckedArr[0] == 'Calculated TCO' ? 18 : 19;
                let device_name = [...new Set(filteredData.map(row => row[6]))];
                const div_inner = document.createElement('div');
                div_inner.className = 'myChart';
                const span = document.createElement('span');
                span.id = `myChart${year}${week}`;
                div_inner.appendChild(span);
                main_tray.appendChild(div_inner);

                let data = [];
                device_name.forEach((device) => {
                    let deviceData = filteredData.filter(row => row[6] == device && row[1] == week && row[0].split(" ")[2] == year);
                    let y = deviceData.map(row => row[tco]);
                    let trace = {
                        y: y,
                        type: 'box',
                        name: device,
                        marker: {
                            color: colorForYear[indexYear],
                        },
                        // hoverinfo: 'name',
                    };
                    data.push(trace);
                });
                var layout = {
                    title: {
                        text: `${week}`,
                    },
                    font: {
                        size: 10,
                    },
                    showlegend: false,
                    margin: {},
                    xaxis: {
                        tickangle: -90,
                        automargin: true,
                    },
                };
                if (index !== 0) {
                    layout.margin = { l: 0, r: 0, pad: 0 };
                } else {
                    layout.margin = { r: 0, pad: 0 };
                }
                Plotly.newPlot(`myChart${year}${week}`, data, layout, config = { responsive: false });
            });
        });

        const table = document.querySelector('.table');
        const table_data = {
            'Product': [],
            'Tariff Name': [],
            'Upfront Cost': [],
            'MO': [],
            'TCO': [],
            'TCO TI': [],
            'Total Discount': [],
            'Total Discount TI': [],
            'GWP': [],
            'Effective Price': [],
            'Effective Price TI': [],
        }

        let tco = tcoCheckedArr[0] == 'Calculated TCO' ? 18 : 19;
        let device_name = [...new Set(filteredData.map(row => row[6]))];
        device_name.forEach((device) => {
            let deviceData = filteredData.filter(row => row[6] == device);
            let min_tco = Math.min(...deviceData.map(row => row[tco]));
            let minRow = deviceData.filter(row => row[tco] == min_tco && row[6] == device);
            let max_discount = Math.max(...minRow.map(row => row[20]));
            let finalRow = minRow.filter(row => row[20] == max_discount && row[6] == device);

            table_data['Product'].push(finalRow[0][6]);
            table_data['Tariff Name'].push(finalRow[0][9]);
            table_data['Upfront Cost'].push(finalRow[0][12]);
            table_data['MO'].push(finalRow[0][14]);
            table_data['TCO'].push(finalRow[0][18]);
            table_data['TCO TI'].push(finalRow[0][19]);
            table_data['Total Discount'].push(finalRow[0][20]);
            table_data['Total Discount TI'].push(finalRow[0][21]);
            table_data['GWP'].push(finalRow[0][32]);
            table_data['Effective Price'].push(finalRow[0][22]);
            table_data['Effective Price TI'].push(finalRow[0][23]);
        });

        // console.log(table_data);

        table.innerHTML = '';

        Object.keys(table_data).forEach((key) => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.innerHTML = key;
            tr.appendChild(th);
            table_data[key].forEach((val) => {
                const td = document.createElement('td');
                td.innerHTML = val == "" ? "-" : val;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    });
});
