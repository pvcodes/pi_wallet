function showPassword() {
  var x = document.getElementById("pswrd");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
