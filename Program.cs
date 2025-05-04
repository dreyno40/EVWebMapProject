var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles(); // Serves index.html by default from wwwroot
app.UseStaticFiles();  // Enables serving CSS, JS, images, etc.

app.Run();

