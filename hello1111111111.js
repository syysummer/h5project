var toastObj = {}
var specialyList // 规格列表
var attributeList // 口味列表
var hasSpecial = false
var hasAttribute = false
if(item.speace == 0){
  toastObj[item.name] = item.name
}else{
  if(item.speace < currentGoods[i].num){
    toastObj[item.name] = item.name
    item.number = item.speace
  }
  if(currentGoods[i].goodSpecialy){
    specialyList = item.specialyList
    if(specialyList){
      specialyList.forEach(el => {
        if(el.name == currentGoods[i].goodSpecialy){
          hasSpecial = true
          item.specialSpece = currentGoods[i].goodSpecialy
          item.goodAttributeId = el.id
        }
      })
    }else{
      toastObj[item.name] = item.name
    }
  }
  if(currentGoods[i].attributeName){
    attributeList = item.attributeList
    if(attributeList){
      attributeList.forEach(el => {
        if(el.name == currentGoods[i].attributeName){
          hasAttribute = true
          item.attributeName = currentGoods[i].attributeName
          item.goodTasteId = el.id
        }
      })
    }else{
      toastObj[item.name] = item.name
    }
  }
  if((currentGoods[i].attributeName&&!hasAttribute) || (currentGoods[i].goodSpecialy &&!hasSpecial)){
    toastObj[item.name] = item.name
  }else{
    num += item.number
    arr.push(item)
  }
}

// 数量中还需要判断是否有规格有属性的商品,是否有(limitNumber)和库存
// 产品总价的计算
// 1. 产品无规格无属性或产品无规格有属性有折扣
// 2. 产品无规格无属性或产品无规格有属性无折扣
// 2. 产品有规格有属性或产品有规格无属性有折扣
// 3. 产品有规格有属性或产品有规格无属性无折扣

