fetch(
  `https://script.google.com/macros/s/AKfycbwA7FUnsW_9GtYX_Wl4nDREgabJIovIxASbZclHtzUj8I18V_E/exec`,
  {
    method: "GET"
  }
)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    const spreadsheet = document.querySelector("#spreadsheet");

    let table = `
                  <table class='table table-bordered'>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Available</th>
                    </tr>
                `;
    for (let i = 0; i < data.length; i++) {
      table += `
                  <tr>
                    <td>${data[i].Name}</td>
                    <td>${data[i].Description}</td>
                    <td>${data[i].Price}</td>
                    <td>${data[i].Available}</td>
                  </tr>
               `;
    }
    table += "</table>";

    spreadsheet.innerHTML = table;
  })
  .catch(function(error) {
    console.log(error);
  });
