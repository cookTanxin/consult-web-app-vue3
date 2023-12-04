export {}
enum Citys {
  china=6,
  american,
  korean
}

const showCity = (city: Citys) => {
  console.log(city)
}

showCity(Citys.korean)
