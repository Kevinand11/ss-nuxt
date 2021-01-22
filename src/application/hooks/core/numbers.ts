enum Numbers {
	thousand = 10 ** 3,
	million = 10 ** 6,
	billion = 10 ** 9,
	trillion = 10 ** 12,
	quadrillion = 10 ** 15,
	quintillion = 10 ** 18,
}

export const formatNumber = (num: number) => {
	num = Math.abs(num)
	if (num < Numbers.thousand) return num.toFixed(0)
	else if (num < Numbers.million) return (num / Numbers.thousand).toFixed(2) + 'k'
	else if (num < Numbers.billion) return (num / Numbers.million).toFixed(2) + 'm'
	else if (num < Numbers.trillion) return (num / Numbers.billion).toFixed(2) + 'b'
	else if (num < Numbers.quadrillion) return (num / Numbers.trillion).toFixed(2) + 'tr'
	else return num.toFixed(0)
}
