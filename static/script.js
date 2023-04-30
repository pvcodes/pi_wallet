function showPassword() {
  var x = document.getElementById("pswrd");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }

}
var $navham = $('#nav-ham')
var $navmenu = $('#nav-menu')

$navham.click(()=>{
  $navmenu.toggleClass("navbarhide")
})