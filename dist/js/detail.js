"use strict";$(function(){new mag(".show",".bigshow",".smallshow",".mask",".bigitem").init();var c=JSON.parse(localStorage.getItem("product_info"));function a(t){naranja().success({title:"message",text:t,icon:!0,timeout:1e4,buttons:[{text:"去购物车",click:function(){window.location.href="../pages/cart.html"}}]})}c||(alert("您要查看的数据不存在"),window.location.href="./list.html"),function(){$(".lable-tit").text(c.skuName),$(".product-meta > h1").text(c.skuName),$(".product-meta > a").text(c.promotionInfo.split(">")[0]+">");var t="";void 0===c.promoPrice?t+='<span class="pro-price fl"><em> ¥ </em>'.concat(c.price,"</span>"):t+='<span class="price-lable fl">抢购价</span>\n              <span class="pro-price fl"><em> ¥ </em>'.concat(c.promoPrice,'</span>\n              <span class="old-price fl"> ¥ ').concat(c.price,"</span>"),$(".price").html(t),$(".leftImg > img").attr("src","https://res.vmallres.com/pimages/".concat(c.photoPath,"428_428_").concat(c.photoName)),$(".bigitem > img").attr("src","https://res.vmallres.com/pimages/".concat(c.photoPath,"428_428_").concat(c.photoName))}(),$(".addCart").click(function(){""===document.cookie&&(alert("请登录 !"),window.location.href="./login.html");var t=JSON.parse(localStorage.getItem("cartList"))||[];if(t.some(function(t){return t.productId===c.productId})){console.log("有");for(var o=null,e=0;e<t.length;e++)if(t[e].productId===c.productId){o=t[e];break}o.number++,o.total=o.number*(void 0===o.promoPrice?o.price:o.promoPrice),a("加入购物车成功,当前商品数量: ".concat(o.number))}else c.number=1,c.total=void 0===c.promoPrice?c.price:c.promoPrice,c.isSelected=!1,t.push(c),a("加入购物车成功,快去看看吧!");localStorage.setItem("cartList",JSON.stringify(t))})});