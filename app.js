// const
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// data  集合
let data = [];


// 初始化跑出兩個人
getRandomUser();
getRandomUser();

// 取得人名跟財富
async function getRandomUser(){
    // fetch 資料
    const respond = await fetch('https://randomuser.me/api');
    // fetch 資料完成後，再將資料轉成JSON格式
    const data = await respond.json();

    const user = data.results[0];

    // 建立一個人
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    
    // 加入到data
    addData(newUser);
}

// 新增的使用者 加入到data
function addData(obj) {
    data.push(obj);

    // 顯示在UI
    updateDOM();
}

// 顯示在uI
function updateDOM(providedData = data) {
    // 清除main div
    main.innerHTML = '<h2><strong>人名</strong> 資產</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML =`<strong>${item.name}</strong> ${formatMoney(
            item.money
          )}`;
          main.appendChild(element);
    });
}


// 數字顯示成為美金格式
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// 財富double
function doubleMoney(){
    //邏輯
    data = data.map(user => {
        return {...user, money: user.money *2};
    });

    // 更新到ui
    updateDOM();
}


// 排行榜
function sortByRichest (){

    console.log('sort');
    // 邏輯
    data.sort((a, b) => b.money - a.money);
    // 更新到ui
    updateDOM();
}

// 顯示百萬富豪
function showMillionaires (){
    //邏輯
    data = data.filter(user => user.money > 1000000);

    //更新到UI
    updateDOM();
}


// 資產加總
function calculateWealth(){
   
    // 總金閣
    const wealth = data.reduce((acc, user) => (acc+= user.money), 0 );
    
    const wealthE1 = document.createElement('div');
    wealthE1.innerHTML = `<h3>總資產: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthE1);

  
    
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
sortBtn.addEventListener('click', sortByRichest);
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
