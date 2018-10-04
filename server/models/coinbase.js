const coinbase = require('coinbase-commerce-node')
const Client = coinbase.Client
const Charge = coinbase.resources.Charge
Client.init('581e8087-6dff-4da7-aa59-8d15da875ae2')

module.exports = function (Coinbase) {
    Coinbase.on('dataSourceAttached', function (obj) {
        Coinbase.create = function (data, cb) {
            const {
                cost,
                cpmDesktop,
                cpmMobile,
                daysTotal,
                desktopUrl,
                mobileUrl
            } = data

            const charge = new Charge({
                name: 'The Sovereign Individual',
                description: `${cpmDesktop} Impressions over ${daysTotal} days. also ${cpmMobile}`,
                local_price: {
                    amount: `${cost}`,
                    currency: "USD"
                },
                pricing_type: 'fixed_price',
                metadata: {
                    desktopUrl: `${desktopUrl}`,
                    mobileUrl: `${mobileUrl}`,
                    customer_name: "Satoshi Nakamoto"
                }
            })
            let result = charge.save()
            cb(null, result)
        }
    })
};