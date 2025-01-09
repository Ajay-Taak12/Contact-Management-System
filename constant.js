exports.errorCodeAndMessage = {
  VALIDATION_ERROR: { code: 400, message: "Validation Failed" },
  UNAUTHORIZED: { code: 401, message: "User Unauthorized" },
  FORBIDDEN: { code: 403, message: "Forbidden Failed" },
  NOT_FOUND: { code: 404, message: "Not Found" },
  SERVER_ERROR: { code: 500, message: "Server Error" },
};

exports.errorHtml = {
  UNAUTHORIZED: {
    code: 401,
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Unauthorized</title>
        </head>
        <body>
          <h1>401 - Unauthorized</h1>
          <p>User not logged in. Please log in to access the dashboard.</p>
        </body>
        </html>
      `,
  },
};
