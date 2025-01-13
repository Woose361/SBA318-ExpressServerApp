module.exports = (data) => `
<!DOCTYPE html>
<html>
<head>
  <title>API Data</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <h1>Welcome to My API</h1>
  <p>Here is some data:</p>
  <ul>
    ${data.map(item => `<li>${item.name}: ${item.value}</li>`).join('')}
  </ul>
</body>
</html>
`;
