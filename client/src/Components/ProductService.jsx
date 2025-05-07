import axios from 'axios';
let panels = [];
export const ProductService = {
    async getPanelsData(token) {
        try {
            console.log(token);

            const res = await axios.get('http://localhost:1135/panel',
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (res.status === 200)
                panels = res.data
            console.log(panels);
            return panels;

        } catch (e) {
            return []
        }
    },
    getPanelsMini() {
        return Promise.resolve(this.getPanelsData().slice(0, 5));
    },

    getPanelsSmall() {
        return Promise.resolve(this.getPanelsData().slice(0, 10));
    },

    getPanels(token) {
        console.log(token);
        return Promise.resolve(this.getPanelsData(token));
    },

    getPanelsWithOrdersSmall() {
        return Promise.resolve(this.getPanelsWithOrdersData().slice(0, 10));
    },
    getPanelsWithOrders() {
        return Promise.resolve(this.getPanelsWithOrdersData());
    }
};

