import app from './app'

app.listen(process.env.PORT, () =>
  console.log(`🚀 ONLINE SERVER ON PORT ${process.env.PORT}`),
)
