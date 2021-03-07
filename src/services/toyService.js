// import { utilService } from './utilService.js';
import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})

const baseUrl = 'http://localhost:3030/api/toys'



export const toyService = {
    removeToy,
    query,
    getById,
    save,
    getTypes,
    getToyIdxById,
    getChartData,
    getChartDataByYear,

    
    // getPrevToy

}

async function getToyIdxById(toyId) {
    const toys = (await axios.get(`${baseUrl}`)).data
    var toyIdx = toys.findIndex(toy => toy._id === toyId)
    console.log('id service ', toyIdx);
    return toyIdx


}

async function getById(toyId) {
    console.log('iddd', toyId);
    const toy = (await axios.get(`${baseUrl}/${toyId}`)).data
    return toy

}


async function query(filterBy ={}) {
    // console.log('filterrr', filterBy);
    // let filterParams = '';
    // if (filterBy) {

    //     filterParams = (filterBy.type !== 'all') ? `?type=${filterBy.type}` : '?'
    //     if (filterBy.name) {
    //         console.log('filterByName', filterBy.name);
    //         filterParams += `&name_like=${filterBy.name}`
    //     }

    //     if (filterBy.filter === 'inStock') filterParams += `&inStock=true`
    //     else filterParams += `&_sort=${filterBy.filter}&_order=asc`
    // }
    // console.log('filterBy', filterParams)
    // const toys = (await axios.get(`${baseUrl}${filterParams}`)).data
     const toys = (await axios.get(baseUrl, {params: filterBy })).data
    return toys

}

async function removeToy(toyId) {
    console.log('toyId', toyId);
    axios.delete(`${baseUrl}/${toyId}`)
}

async function save(toyToSave) {
    if (toyToSave._id) {
        // UPDATE
        console.log('iff');
        const toy = (await axios.put(`${baseUrl}/${toyToSave._id}`, toyToSave)).data
        return toy
    } else {
        // CREATE
        console.log('else');
        toyToSave.createdAt = Date.now()
        toyToSave.inStock = true
        const toyToAdd = (await axios.post(`${baseUrl}`, toyToSave)).data
        return toyToAdd
    }
}

    
async function getTypes() {
    const toys = (await axios.get(`${baseUrl}`)).data
    var types = Array.from(new Set(toys.map(toy => toy.type)))
    return types
}
async function getChartData() {
    const toys = (await axios.get(`${baseUrl}`)).data
    const types = await getTypes()
    const labels = types.map(type => type)
    const datasets = [{
        data: toys.reduce((acc, toy) => {
            const currIdx = types.indexOf(toy.type);
            const currAccCell = acc[currIdx]
            acc[currIdx] = currAccCell ? acc[currIdx] + 1 : 1
            return acc

        }, []),
        backgroundColor: [

            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#0000FF',
            '#00ff0d'


        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]

    }]
    return { labels, datasets }

}

 async function getChartDataByYear() {
    const toys = (await axios.get(`${baseUrl}`)).data
    let yearsMap = {}
    toys.forEach(toy => {
        const year = new Date(toy.createdAt).getFullYear()
        if (yearsMap[year]) yearsMap[year] = yearsMap[year] + 1
        else yearsMap[year] = 1

    })
    console.log('yearsMap', yearsMap);
    return {
        labels: [...Object.keys(yearsMap)],
        datasets: [
            {
                label: 'Toys per year',
                data: [...Object.values(yearsMap)]
            }
        ]
    }

}