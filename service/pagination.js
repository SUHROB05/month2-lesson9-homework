export const createPagination =  (data, limit, page) => {
    
    const paginationData = data.slice((page-1) * limit , page * limit)
    
    return paginationData || []
}

export const createFilter = (data, companyName) => {
    console.log(data);
    companyName = companyName.toLowerCase()

    const filterData = data.filter(item => item.company.toLowerCase() == companyName)
}
 