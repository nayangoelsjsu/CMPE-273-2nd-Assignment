document.getElementById("navMenu").innerHTML =
    '<div class="container-fluid">'+
    '<div class="navbar-header">'+
      '<a class="navbar-brand" href="/home"><img src="/images/eBay_logo.png" width= "80", height= "36"></a>'+
    '</div>'+
    '<ul class="nav navbar-nav">'+
      '<li>'+
      '<div class="dropdown">'+
      '<button class="dropbtn">Hi</button>'+
      '<div class="dropdown-content">'+
      '<a href="/profile"><span class="glyphicon glyphicon-user"></span> Profile</a>'+
      '<a href="/signout"><span class="glyphicon glyphicon-log-out"></span> Sign Out</a>'+
      '</div>'+
      '</div>'+
      '</li>'+
      '<li><a data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-briefcase"></span> Sell Item</a>'+ 
  '<div class="modal fade" id="myModal" role="dialog">'+
   '<div class="modal-dialog">'+
      '<div class="modal-content">'+
        '<div class="modal-header">'+
         ' <button type="button" class="close" data-dismiss="modal">&times;</button>'+
          '<h4 class="modal-title">Add Item</h4>'+
        '</div>'+
           '<div class="modal-body">'+
    '<form method="post" action="/regitem">'+
   '<label>Item Name</label> <input type="text" name="name" id="name" class="form-control" required><br>'+
   '<label>Auction/Fixed Price</label><br>'+
   '<select name="auction" class="btn btn-default" style="width: 360px">'+
  '<option value="Auction">Auction</option>'+
  '<option value="Fixed">Fixed</option>'+
   '</select>'+
    '<br><label>Item Description</label> <input type="text" name="description" id="description" class="form-control" required><br>'+
    '<label>Item Price ($) </label> <input type="text" name="price" id="price" class="form-control" required><br>'+
    '<label>Item Quantity</label> <input type="text" name="quantity" id="quantity" class="form-control" required><br>'+
    '<label>Type</label><input type="text" name="type" id="type" class="form-control" required><br>'+
    '<center><input type="submit" name="submit" value="Submit" class="btn btn-default"></center>'+
    '</form>'+
    '</div>'+
    '</div> '+       
      '</div>'+
    '</div>'+
  '</li>'+
    '</ul>'+
    '<ul class="nav navbar-nav navbar-right">'+
      '<li><a href="/viewcart"><span class="glyphicon glyphicon-shopping-cart"></span> Cart Items: <span id="cart"> </span></a></li>'+
    '</ul>'+
  '</div>';
  document.getElementById('cart').innerHTML= document.getElementById('cartval').innerHTML;