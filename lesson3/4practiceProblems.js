/* eslint-disable max-lines-per-function */
// let invoice = {
//   phone: 3000,
//   internet: 6500
// };

// let payment = {
//   phone: 1300,
//   internet: 5500
// };

// let invoiceTotal = invoice.phone + invoice.internet;
// let paymentTotal = payment.phone + payment.internet;
// let remainingDue = invoiceTotal - paymentTotal;

// console.log(paymentTotal);         // => 6800
// console.log(remainingDue);         // => 2700

function createInvoice(services) {
  let values = {
    internet: 5500,
    phone: 3000,
    totalPaid: 0,
    total() {
      return this.internet + this.phone;
    },
    addPayment(payment) {
      this.totalPaid += payment.total();
    },
    addPayments(payments) {
      payments.forEach((_, idx) => {
        this.totalPaid += payments[idx].total();
      });
      // for (let idx = 0; idx < payments.length; idx++) {
      //   this.totalPaid += payments[idx].total();
      // }
    },
    amountDue() {
      return this.total() - this.totalPaid;
    },
  };

  if (services !== undefined) {
    if (services.internet) {
      values.internet = services.internet;
    }
    if (services.phone) {
      values.phone = services.phone;
    }
  }
  values.total();
  return values;
}

function createPayment(services = {}) {
  let paymentVals = {
    internet: services.phone || 0,
    phone: services.internet || 0,
    amount: services.amount || 0,
    total() {
      return this.amount || (this.internet + this.phone);
    },
  };
  return paymentVals;
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0

//-------------------------------------------------------------------
// function invoiceTotal(invoices) {
//   let total = 0;

//   for (let index = 0; index < invoices.length; index += 1) {
//     total += invoices[index].total();
//   }

//   return total;
// }

// let invoices = [];
// invoices.push(createInvoice());
// invoices.push(createInvoice({ internet: 6500 }));
// invoices.push(createInvoice({ phone: 2000 }));
// invoices.push(createInvoice({
//   phone: 1000,
//   internet: 4500,
// }));

// console.log(invoiceTotal(invoices)); // 31000

//----------------------------------------------------------------------------

// function paymentTotal(payments) {
//   return payments.reduce((sum, payment)  => sum + payment.total(), 0);
// }

// let payments = [];
// payments.push(createPayment());
// payments.push(createPayment({
//   internet: 6500,
// }));

// payments.push(createPayment({
//   phone: 2000,
// }));

// payments.push(createPayment({
//   phone: 1000,
//   internet: 4500,
// }));

// payments.push(createPayment({
//   amount: 10000,
// }));

// console.log(paymentTotal(payments));      // => 24000