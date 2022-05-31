const { app } = require('./app')
app.listen(process.env.PORT, () => {
    console.log(`Listening On Port ${process.env.PORT}`);
});
