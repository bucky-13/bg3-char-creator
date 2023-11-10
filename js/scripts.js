// Object for keeping track of all the numbers on the page
let attributes = {
  abilityPointsTotal: 27,
  str: {
    index: 1,
    baseValue: 8,
    modifier1: 0,
    modifier2: 0,
    get totalValue() {
      return this.baseValue + this.modifier1 + this.modifier2;
    },
  },
  dex: {
    index: 2,
    baseValue: 8,
    modifier1: 0,
    modifier2: 0,
    get totalValue() {
      return this.baseValue + this.modifier1 + this.modifier2;
    },
  },
  con: {
    index: 3,
    baseValue: 8,
    modifier1: 0,
    modifier2: 0,
    get totalValue() {
      return this.baseValue + this.modifier1 + this.modifier2;
    },
  },
  int: {
    index: 4,
    baseValue: 8,
    modifier1: 0,
    modifier2: 0,
    get totalValue() {
      return this.baseValue + this.modifier1 + this.modifier2;
    },
  },
  wis: {
    index: 5,
    baseValue: 8,
    modifier1: 0,
    modifier2: 0,
    get totalValue() {
      return this.baseValue + this.modifier1 + this.modifier2;
    },
  },
  cha: {
    index: 6,
    baseValue: 8,
    modifier1: 0,
    modifier2: 0,
    get totalValue() {
      return this.baseValue + this.modifier1 + this.modifier2;
    },
  },
  dummy: {
    index: 0,
    baseValue: 0,
    modifier1: 0,
    modifier2: 0,
    get totalValue() {
      return this.baseValue + this.modifier1 + this.modifier2;
    },
  },
};

// ALL the querySelectors for the page
const abilityPointsCount = document.querySelector('#ability-points-count');
const strMinus = document.querySelector('#btn-str-minus');
const strPlus = document.querySelector('#btn-str-plus');
const abilityStr1 = document.querySelector('#ability-str-1');
const abilityStr2 = document.querySelector('#ability-str-2');
const strScoreDisplayed = document.querySelector('#str-score-displayed');
const dexMinus = document.querySelector('#btn-dex-minus');
const dexPlus = document.querySelector('#btn-dex-plus');
const abilityDex1 = document.querySelector('#ability-dex-1');
const abilityDex2 = document.querySelector('#ability-dex-2');
const dexScoreDisplayed = document.querySelector('#dex-score-displayed');
const conMinus = document.querySelector('#btn-con-minus');
const conPlus = document.querySelector('#btn-con-plus');
const abilityCon1 = document.querySelector('#ability-con-1');
const abilityCon2 = document.querySelector('#ability-con-2');
const conScoreDisplayed = document.querySelector('#con-score-displayed');
const intMinus = document.querySelector('#btn-int-minus');
const intPlus = document.querySelector('#btn-int-plus');
const abilityInt1 = document.querySelector('#ability-int-1');
const abilityInt2 = document.querySelector('#ability-int-2');
const intScoreDisplayed = document.querySelector('#int-score-displayed');
const wisMinus = document.querySelector('#btn-wis-minus');
const wisPlus = document.querySelector('#btn-wis-plus');
const abilityWis1 = document.querySelector('#ability-wis-1');
const abilityWis2 = document.querySelector('#ability-wis-2');
const wisScoreDisplayed = document.querySelector('#wis-score-displayed');
const chaMinus = document.querySelector('#btn-cha-minus');
const chaPlus = document.querySelector('#btn-cha-plus');
const abilityCha1 = document.querySelector('#ability-cha-1');
const abilityCha2 = document.querySelector('#ability-cha-2');
const chaScoreDisplayed = document.querySelector('#cha-score-displayed');
const dummyScoreDisplayed = document.querySelector('#dummy-score-displayed');

const plus1 = document.querySelectorAll("input[name='plus1']");
const plus2 = document.querySelectorAll("input[name='plus2']");
var lastActivePlus1Radio = [0, "dummy"];
var lastActivePlus2Radio = [0, "dummy"];


//Functions

//Function for adding a point to an ability
function addPoint(a, d) {
  if (a.baseValue < 13 && attributes.abilityPointsTotal > 0) {
    a.baseValue++;
    d.innerHTML = a.totalValue;
    attributes.abilityPointsTotal--;
    abilityPointsCount.innerHTML = attributes.abilityPointsTotal;
  } else if (a.baseValue < 15 && attributes.abilityPointsTotal > 1) {
    a.baseValue++;
    d.innerHTML = a.totalValue;
    attributes.abilityPointsTotal -= 2;
    abilityPointsCount.innerHTML = attributes.abilityPointsTotal;
  }
}

//Function for removing a point from an ability
function removePoint(a, d) {
  if (
    a.baseValue > 8 &&
    a.baseValue <= 13 &&
    attributes.abilityPointsTotal < 27
  ) {
    a.baseValue--;
    d.innerHTML = a.totalValue;
    attributes.abilityPointsTotal++;
    abilityPointsCount.innerHTML = attributes.abilityPointsTotal;
  } else if (
    a.baseValue > 8 &&
    a.baseValue <= 15 &&
    attributes.abilityPointsTotal < 27
  ) {
    a.baseValue--;
    d.innerHTML = a.totalValue;
    attributes.abilityPointsTotal += 2;
    abilityPointsCount.innerHTML = attributes.abilityPointsTotal;
  }
}

//Function for checking a +1 bonus radio button, also removes the point from all other buttons

function plus1Radio(radio) {
  for (let i = 0; i < radio.length; i++) {
    let abi = radio[i].value;
    let html = `${radio[i].value}-score-displayed`;
    if (radio[i].checked == true) {
      attributes[abi].modifier1 = 1;
      const htmlScore = document.querySelector(`#${html}`);
      htmlScore.innerHTML = attributes[abi].totalValue;
    } else if (radio[i].checked == false) {
      attributes[abi].modifier1 = 0;
      const htmlScore = document.querySelector(`#${html}`);
      htmlScore.innerHTML = attributes[abi].totalValue;
    }
  }
}

//Function for checking a +2 bonus radio button, also removes the point from all other buttons
function plus2Radio(radio) {
  for (let i = 0; i < radio.length; i++) {
    let abi = radio[i].value;
    let html = `${radio[i].value}-score-displayed`;
    if (radio[i].checked == true) {
      attributes[abi].modifier2 = 2;
      const htmlScore = document.querySelector(`#${html}`);
      htmlScore.innerHTML = attributes[abi].totalValue;
    } else if (radio[i].checked == false) {
      attributes[abi].modifier2 = 0;
      const htmlScore = document.querySelector(`#${html}`);
      htmlScore.innerHTML = attributes[abi].totalValue;
    }
  }
}

//Since we can't have both radios for an attribute selected, these functions make sure this cannot happen.
//TODO: turn them into one function with additional parameters.

function radio2Checker(radio2, radio1) {
  let plus2boolean = [];
  let plus1boolean = [];
  let plus2value = [];
  let radio2html = radio2;
    let indexObject = document.querySelector("input[name='plus2']:checked");
 let indexValue = indexObject.value

  for (let i = 0; i < radio2.length; i++) {
    plus2boolean.push(radio2[i].checked);
    plus2value.push(radio2[i].value);
    plus1boolean.push(radio1[i].checked);
    let indexNo = attributes[indexValue].index;

    if (plus2boolean[i] === true && plus1boolean[i] === true) {
      let abi = radio2[i].value;
      const htmlScore = document.querySelector(`#${radio2[i].value}-score-displayed`);
      const lastActiveScoreDisplayed = document.querySelector(`#${lastActivePlus2Radio[1]}-score-displayed`);
      attributes[abi].modifier2 = 0;
      radio2html[lastActivePlus2Radio[0]].checked = true;
      attributes[lastActivePlus2Radio[1]].modifier2 = 2;
      lastActiveScoreDisplayed.innerHTML = attributes[lastActivePlus2Radio[1]].totalValue;
      htmlScore.innerHTML = attributes[abi].totalValue;

    } else if (plus2boolean[i] === false && plus1boolean[i] === true) {
      lastActivePlus2Radio = [indexNo, indexValue];
    }
  }
}
function radio1Checker(radio2, radio1) {
  let plus2boolean = [];
  let plus1boolean = [];
  let plus2value = [];
  let radio2html = radio2;
  let indexObject = document.querySelector("input[name='plus1']:checked");
 let indexValue = indexObject.value

  for (let i = 0; i < radio2.length; i++) {
    plus2boolean.push(radio2[i].checked);
    plus2value.push(radio2[i].value);
    plus1boolean.push(radio1[i].checked);
    let indexNo = attributes[indexValue].index;

    if (plus2boolean[i] === true && plus1boolean[i] === true) {
      let abi = radio2[i].value;
      const htmlScore = document.querySelector(`#${radio2[i].value}-score-displayed`);
      const lastActiveScoreDisplayed = document.querySelector(`#${lastActivePlus1Radio[1]}-score-displayed`);
      attributes[abi].modifier1 = 0;
      radio2html[lastActivePlus1Radio[0]].checked = true;
      attributes[lastActivePlus1Radio[1]].modifier1 = 1;
      lastActiveScoreDisplayed.innerHTML = attributes[lastActivePlus1Radio[1]].totalValue;
      htmlScore.innerHTML = attributes[abi].totalValue;

    } else if (plus2boolean[i] === false && plus1boolean[i] === true) {
      lastActivePlus1Radio = [indexNo, indexValue];
    }
  }
}

//Event listeners for the + / - buttons for each ability

strPlus.addEventListener('click', function () {
  addPoint(attributes.str, strScoreDisplayed);
});
strMinus.addEventListener('click', function () {
  removePoint(attributes.str, strScoreDisplayed);
});
dexPlus.addEventListener('click', function () {
  addPoint(attributes.dex, dexScoreDisplayed);
});
dexMinus.addEventListener('click', function () {
  removePoint(attributes.dex, dexScoreDisplayed);
});
conPlus.addEventListener('click', function () {
  addPoint(attributes.con, conScoreDisplayed);
});
conMinus.addEventListener('click', function () {
  removePoint(attributes.con, conScoreDisplayed);
});
intPlus.addEventListener('click', function () {
  addPoint(attributes.int, intScoreDisplayed);
});
intMinus.addEventListener('click', function () {
  removePoint(attributes.int, intScoreDisplayed);
});
wisPlus.addEventListener('click', function () {
  addPoint(attributes.wis, wisScoreDisplayed);
});
wisMinus.addEventListener('click', function () {
  removePoint(attributes.wis, wisScoreDisplayed);
});
chaPlus.addEventListener('click', function () {
  addPoint(attributes.cha, chaScoreDisplayed);
});
chaMinus.addEventListener('click', function () {
  removePoint(attributes.cha, chaScoreDisplayed);
});

//Event listeners for the radio buttons

plus1.forEach((plus) =>
  plus.addEventListener('click', function () {
    plus1Radio(plus1);
    radio1Checker(plus1, plus2);
  })
);
plus2.forEach((plus) =>
  plus.addEventListener('click', function () {
    plus2Radio(plus2);
    radio2Checker(plus2, plus1);
  })
);
