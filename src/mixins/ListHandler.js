const defaultConfig = {
    key: 'listData',
    limit: 3 // Set 3 instead 5 to simulate pagination function clearly
}

const mixin = (config) => {
    const currentConfig = { ...defaultConfig, ...config || {} }

    const { key, limit } = currentConfig

    return {
        data() {
            return {
                [key]: [],
                page: 1

            }
        },

        computed: {
            isCanLoadMore() {
                return this.getListDataView.length < this[key].length
            },

            getListDataView() {
                return this[key].slice(0, limit * this.page);
            }
        },

        methods: {
            setListData(data) {
                this[key] = data
                this.page = 1
            },

            loadMoreListData() {
                this.page++
            },


        }
    }
}

export default mixin