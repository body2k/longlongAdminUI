export const shortcuts =
    [
        {
            text: '最近一周',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setDate(start.getDate() - 7)
                return [start, end]
            },
        },
        {
            text: '最近一月',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setMonth(start.getMonth() - 1)
                return [start, end]
            },
        },
        {
            text: '最近三月',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setMonth(start.getMonth() - 3)
                return [start, end]
            },
        }]
export const timeDatePicker = [
    {
        text: 'Today',
        value: new Date(),
    },
    {
        text: 'Yesterday',
        value: () => {
            const date = new Date()
            date.setDate(date.getDate() - 1)
            return date
        },
    },
    {
        text: 'A week ago',
        value: () => {
            const date = new Date()
            date.setDate(date.getDate() - 7)
            return date
        },
    },
]