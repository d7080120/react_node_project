import axios from 'axios';
let panels = [];
export const CustomerPanelService = {
    async getPanelsData(token,userInfo) {
        console.log(token);
try{
        const res = await axios.get(`http://localhost:1135/panel/customer/${userInfo.customer._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        if(res.status===200)
        panels = res.data
        console.log(panels);
        return panels;
}catch(e){
return []
}
    },
    

    getPanelsMini() {
        return Promise.resolve(this.getPanelsData().slice(0, 5));
    },

    getPanelsSmall() {
        return Promise.resolve(this.getPanelsData().slice(0, 10));
    },

    getPanels(token,userInfo) {
        console.log(token);
        return Promise.resolve(this.getPanelsData(token,userInfo));
    },

    getPanelsWithOrdersSmall() {
        return Promise.resolve(this.getPanelsWithOrdersData().slice(0, 10));
    },

    getPanelsWithOrders() {
        return Promise.resolve(this.getPanelsWithOrdersData());
    }
};

