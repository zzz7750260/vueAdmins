//中英切换判断
export function generateTitle(title){
	console.log("the title:"+ title);
	const hasKey = this.$te('route.' + title)  //i18n中的方法，判断翻译包中是否存在key
	const translatedTitle = this.$t('route.' + title)   //i18n中翻译的方法
	
	if(hasKey){
		return translatedTitle		
	}
	return title
}