interface Item {
  name: string
  count: number
  price: number
  pay_count: number
}
interface OtherInfo {
  unit_price: number
  pay_total_count: number
  total_count: number
  total_price: number
  need_time: number
  total_time_price: number
}

const list_a: Item[] = [
  { name: '免费4*3天', count: 12, price: 0, pay_count: 1 },
  { name: '补给包￥6', count: 2, price: 6, pay_count: 1 },
  { name: '补给包￥12', count: 4, price: 12, pay_count: 1 },
  { name: '补给包￥68', count: 12, price: 68, pay_count: 1 },
  { name: '补给包￥68', count: 12, price: 68, pay_count: 1 },

  { name: '补给包￥128', count: 20, price: 128, pay_count: 1 },
  { name: '补给包￥128', count: 20, price: 128, pay_count: 1 },
  { name: '补给包￥128', count: 20, price: 128, pay_count: 1 },

  { name: '补给包￥328', count: 40, price: 328, pay_count: 1 },
  { name: '补给包￥328', count: 40, price: 328, pay_count: 1 },
  { name: '补给包￥328', count: 40, price: 328, pay_count: 1 },
  { name: '补给包￥328', count: 40, price: 328, pay_count: 1 },
  { name: '补给包￥328', count: 40, price: 328, pay_count: 1 },

  { name: '补给包￥648', count: 60, price: 648, pay_count: 1 },
  { name: '补给包￥648', count: 60, price: 648, pay_count: 1 },
  { name: '补给包￥648', count: 60, price: 648, pay_count: 1 },
  { name: '补给包￥648', count: 60, price: 648, pay_count: 1 },
  { name: '补给包￥648', count: 60, price: 648, pay_count: 1 },
  { name: '补给包￥648', count: 60, price: 648, pay_count: 1 },
  { name: '补给包￥648', count: 60, price: 648, pay_count: 1 },
  { name: '补给包￥648', count: 60, price: 648, pay_count: 1 },
  { name: '补给包￥648', count: 60, price: 648, pay_count: 48 }
]

const func = (list: Item[]) => {
  const arr: (Item & OtherInfo)[] = []
  let pay_total_count = 0

  let total_price = 0
  const need_count = 2400
  for (const item of list) {
    const { price, count, pay_count } = item
    const unit_price = Math.round((price / count) * 100) / 100
    pay_total_count = pay_total_count + count * pay_count
    total_price = total_price + price * pay_count
    const total_count = Math.floor(pay_total_count * 1.1)
    const need_time = Math.round(need_count / pay_total_count)
    const total_time_price = Math.round(need_time * total_price)
    const obj = { ...item, unit_price, pay_total_count, total_count, total_price, need_time, total_time_price }
    arr.push(obj)
  }
  const _list = arr.sort((a, b) => (a.unit_price - b.unit_price >= 0 ? 1 : -1))
  console.table(_list)
}
func(list_a)
// 每次活动抽100次，花费￥538，需要22次活动，共计花费￥11836
// 每次活动抽100次，花费￥538，需要22次活动，共计花费￥11836

const aaa = () => {
  const qxsh_val = 5 // 全系伤害
  const qxsh_bfb_val = 1.2 // 全系伤害百分百

  const zzsh_val = 4 // 最终伤害
  const jdsh_val = 1.41 // 绝对伤害

  const bjjl_val = 0.5 // 暴击几率
  const bjsh_val = 3 // 暴击伤害

  const 攻击力 = 100 * 6
  const 人物攻击百分比加成 = 0.05 * 3
  const 所有伤害百分比加成 = 0.15 * 3

  const 宠物攻击力加成 = 1502
  const 芯片攻击力加成 = 100 * 6

  const 基础伤害 = 攻击力 + 攻击力 * 人物攻击百分比加成 + 宠物攻击力加成 + 芯片攻击力加成

  // const jcsh_num =
}
