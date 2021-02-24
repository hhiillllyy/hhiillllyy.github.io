// Shopping Basket JavaScript code by Kevin Penny
// Copy this file to your website folder and 
// refer to the 'storagebasket' example page 
// to build your own shopping page.

function addToBasket(item,price)
{
	// Add to basket
	var basketItem={};
	basketItem.item = item;
	basketItem.price = price;
	basketItem.quantity = 1;
	localStorage.setItem(item, JSON.stringify(basketItem));	
	// Show basket contents
	showBasket();
	showBasketQtyPrice();
}

function addToBasketQty(item,price,quantityId)
{
	// Add to basket				
	var quantity = Number(document.getElementById(quantityId).value);
	var basketItem={};
	basketItem.item = item;
	basketItem.price = price;
	basketItem.quantity = quantity;
	localStorage.setItem(item, JSON.stringify(basketItem));					
	// Show basket contents
	showBasket();
	showBasketQtyPrice();				
}
			
function showBasket()
{
	// Displays all items in basket and calculates and displays total cost
	if (document.getElementById("basket") != null)
	{
		if(typeof(Storage)!=="undefined")
		{							
			var items = "";
			var total = 0;
			for(var key in localStorage) 
			{
				console.log(key);				
				var obj = JSON.parse(localStorage.getItem(key));
				try // temporary fix for item null error KP 31/01/2018
				{
					items += obj.item + ", &pound;" + obj.price + ", Qty: " + obj.quantity + "<br />";
					total += obj.price * obj.quantity;
				}
				catch(err)
				{
					console.log(err)
				}
			}
			items += "Total: &pound;" + total.toFixed(2);
			document.getElementById("basket").innerHTML=items;
		}
		else
		{
			document.getElementById("basket").innerHTML="Sorry, your browser does not support HTML5 local storage...";
		}		
	}				
} 

function showBasketQtyPrice()
{
	// Displays number of items in basket and calculates and displays total cost
	if (document.getElementById("basketqtyprice") != null)
	{
		if(typeof(Storage)!=="undefined")
		{					
			var itemsnum = 0;
			var items = "";					
			var total = 0;
			for(var key in localStorage) 
			{
				var obj = JSON.parse(localStorage.getItem(key));
				try // temporary fix for item null error KP 31/01/2018
				{
					itemsnum += obj.quantity;
					total += obj.price * obj.quantity;
				}
				catch(err)
				{
					console.log(err)
				}
			}
			items += "Basket: ("+ itemsnum + ") &pound;" + total.toFixed(2);
			document.getElementById("basketqtyprice").innerHTML=items;
		}
		else
		{
			document.getElementById("basketqtyprice").innerHTML="Sorry, your browser does not support HTML5 local storage...";
		}	
	}				
}

function deleteItem(item)
{
	// Remove item from basket
	localStorage.removeItem(item);
	// Show basket contents
	showBasket();
	showBasketQtyPrice();
	
}
function emptyBasket()
{
	// Empty basket by clearing localStorage contents
	localStorage.clear();
	// Show basket contents
	showBasket();
	showBasketQtyPrice();
}