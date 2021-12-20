// parameters
const maxLength = 121
const take = 10
const delayMs = 1000
// --

const resultsElement = document.getElementById('results')
const loadingElement = document.getElementById('loading')
const pageNoElement = document.getElementById('page-no')

const observer = new IntersectionObserver(handler)


let skip = 0
let pageNo = 0
showPartData()


async function handler(entries) {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            await showPartData()
        }
    }
}

async function showPartData() {
    loadingElement.textContent = 'loading data...💾'
    const res = await getData(skip)
    skip += res.data.length
    res.data.forEach((value, index) => {
        const element = document.createElement('p')
        element.textContent = value
        resultsElement.appendChild(element)
        if (index === res.data.length - 1) {
            observer.disconnect()
            observer.observe(element)
        }
    });

    if (res.data.length) {
        pageNo++
        pageNoElement.textContent = pageNo
    }

    if (!res.more) {
        observer.disconnect()
        loadingElement.textContent = 'no more data'
    }
}


async function getData(skip) {
    // fake data
    await delay()
    const res = []
    let more = false
    for (let i = 0; i < take; i++) {
        if (skip + i < maxLength) {
            const value = `Item number ${skip + i + 1}`
            res.push(value)
            more = true
        }
    }
    return {
        data: res,
        more: more
    }
}

async function delay() {
    return new Promise((res => setTimeout(_ => res(), delayMs)))
}