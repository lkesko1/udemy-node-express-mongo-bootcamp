const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware for json communication
app.use(express.json());
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

// ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Handling unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't found ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

//ROUTE HANDLERS
// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);
