export const equalInput = (val1, val2 = '') => {
    if (typeof (val1 === 'number' || val1 === 'string')) {
        val1 = String(val1)
    } else {
        val1 = Boolean(val1)
    }

    if (typeof (val2 === 'number' || val2 === 'string')) {
        val2 = String(val2)
    } else {
        val2 = Boolean(val2)
    }

    return val1 === val2
}

export const checkInput = (val) => {
    if (val === undefined || val === null || undefined === false) {
        val = false
    } else if (typeof (val) === 'number' || typeof (val) === 'string') {
        if (String(val).trim().length === 0) {
            val = false
        } else {
            val = true
        }
    } else {
        val = Boolean(val)
    }

    return val
}

export const equalAddress = (addr1, addr2) => {
    addr1 = String(addr1).toLowerCase()
    addr2 = String(addr2).toLowerCase()

    if(addr1===addr2){
        return true
    }else{
        return false
    }
}