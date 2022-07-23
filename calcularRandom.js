const calcular = (cant = 10000000) => {
  const nums = {}
  for (let i = 0; i < cant; i++) {
    let random = Math.floor(Math.random() * 1000)
    nums[String(random)] = nums[String(random)] ? nums[String(random)] + 1 : 1
  }
  return nums
}

process.on('message', msg => {
  const nums = calcular(msg)
  process.send(nums)
})

process.send('end')
