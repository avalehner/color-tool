const validHexCharacters = ['a','b','c','d','e','f','A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9']
const hexInput = document.getElementById('hex-input')
const inputColor = document.getElementById('input-color')
const alteredColor = document.getElementById('altered-color')
const alteredColorText = document.getElementById('altered-color-text')
const slider = document.getElementById ('slider')
const sliderText = document.getElementById('slider-text')
const lightenText = document.getElementById('lighten-text')
const darkenText = document.getElementById('darken-text')
const toggleBtn = document.getElementById('toggle-btn')

// event listeners 
hexInput.addEventListener('keyup',() => {
  //removes '#'
  const strippedHex = hexInput.value.replace('#', '')
  
  if (isValidHex(strippedHex)) {
   inputColor.style.backgroundColor = `#${strippedHex}`
  } else return; 

  reset()
})

slider.addEventListener('input', () => {
  sliderText.textContent = `${slider.value}%`

  if(!isValidHex(hexInput.value)) return 

  const percentageChange = 
  toggleBtn.classList.contains('toggled') ? 
  -slider.value 
  : slider.value

  const alteredHex = alterColor(hexInput.value, percentageChange)
  alteredColor.style.backgroundColor = alteredHex
  alteredColorText.innerText = `Altered Color ${alteredHex}`
})

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('toggled')
  if (toggleBtn.classList.contains('toggled')) {
    lightenText.classList.add('unselected')
    darkenText.classList.remove('unselected')
  } else if (!toggleBtn.classList.contains('toggled')) {
    lightenText.classList.remove('unselected')
    darkenText.classList.add('unselected')
  }
  reset()
})

// functions 

const isValidHex = (hex) => {
  // Checks if anything is written into hex field 
  if(!hex) return false 

  // removes '#' from hex if necessary
  const strippedHex = hex.replace('#', '')

  // Checks if there is an invalid character 
  function containsInvalidCharacter (str, allowedCharacters) {
    return [...str].some(char => !allowedCharacters.includes(char))
  }

  //returns 'false' if there is an invalid character
  if (containsInvalidCharacter (strippedHex, validHexCharacters)) {
    return false
  }

  // checks if there is valid hex length (3 or 6)
  return strippedHex.length === 3 || strippedHex.length === 6
}

const convertHexToRgb = (hex) => {
  if (!isValidHex(hex)) return null; 
  
  let strippedHex = hex.replace ('#', '')
  
  if (strippedHex.length === 3) {
    strippedHex = strippedHex[0] + strippedHex [0] +
    strippedHex[1] + strippedHex [1] + 
    strippedHex[2] + strippedHex [2]
  }

  const r = parseInt(strippedHex.substring(0,2), 16)
  const g = parseInt(strippedHex.substring(2,4), 16)
  const b = parseInt(strippedHex.substring(4), 16)

  return {r, g, b}
}

const convertRgbToHex = (r,g,b) => {
  const RtoHex = (`0${r.toString(16)}`).slice(-2)
  const BtoHex = (`0${g.toString(16)}`).slice(-2)
  const CtoHex = (`0${b.toString(16)}`).slice(-2)

  const hex = `#${RtoHex}${BtoHex}${CtoHex}`
  return hex
}

  // handle altered color 
const alterColor = (hex, percentage) => {
  const {r,g,b} = convertHexToRgb(hex)
  
  const amount = Math.floor((percentage/100) * 255) 

  const newR = checkValidRange(r, amount) 
  const newG = checkValidRange(g, amount) 
  const newB = checkValidRange(b, amount) 
  return convertRgbToHex(newR, newG, newB)
}

//check if rgb is within valid range
const checkValidRange = (hex, amount) => {
  const newHex = hex + amount 
  if (newHex > 255) return 255 
  if (newHex < 0) return 0
  return newHex
}

const reset = () => {
  const strippedHex = hexInput.value.replace('#', '')
  
  slider.value = 0 
  sliderText.textContent = '0%'
  alteredColor.style.backgroundColor = `#${strippedHex}`
  alteredColorText.textContent = `Altered Color #${strippedHex}`
}


