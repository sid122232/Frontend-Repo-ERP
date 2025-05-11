import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import './invoice.css';

const numberToWords = (num) => {
  // Convert number to words
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
    'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
  ];
  const b = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
    'Sixty', 'Seventy', 'Eighty', 'Ninety',
  ];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + inWords(n % 100) : '');
    if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand ' + inWords(n % 1000);
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh ' + inWords(n % 100000);
    return inWords(Math.floor(n / 10000000)) + ' Crore ' + inWords(n % 10000000);
  };

  return inWords(Math.floor(num));
};

const Invoice = ({ invoice }) => {
  useEffect(() => {
    document.title = "Invoice - Adept Automation";
  }, []);

  if (!invoice) {
    return <p>No invoice data found. Please fill the invoice form.</p>;
  }

  const { companyName, customerName, phoneNumber, streetAddress, city, state, gstNumber, email, invoiceNumber, date, poNumber, poDate } = invoice;

  const hasGST = invoice.items.some(item => item.tax1 === "GST" || item.tax2 === "GST");
  const hasCGST = invoice.items.some(item => item.tax1 === "CGST" || item.tax2 === "CGST");
  const hasSGST = invoice.items.some(item => item.tax1 === "SGST" || item.tax2 === "SGST");

  const getTotalTaxValue = (item, taxableValue) => {
    const gstRate = 18;
    const { tax1, tax2 } = item;

    // If no tax rate or both tax fields are empty
    if (!gstRate || (!tax1 && !tax2)) return 0;

    // If both taxes are the same, apply once
    if (tax1 === tax2 && (tax1 === "CGST" || tax1 === "SGST")) {
      return (taxableValue * (gstRate / 2)) / 100;
    }
  
    if ((tax1 === "CGST" && tax2 === "SGST") || (tax1 === "SGST" && tax2 === "CGST")) {
      return (taxableValue * gstRate) / 100;
    }
    if (tax1 || tax2 === "GST") {
      return (taxableValue * gstRate ) / 100;
    }
  

    // If tax types are different, assume 50% of gstRate applies to each (like CGST + SGST)
    return (taxableValue * gstRate) / 100;
  };

  return (
    <div className='backgrounds mt-1 m-auto'>
      <Helmet>
        <title>Invoice_{invoiceNumber}</title>
      </Helmet>

      <div className="invoice-box">
        <h1 className="center">Tax Invoice</h1>
        <div className="row">
          <div className="vertical-line"></div>

          <div className="boxer ">
            <div className="first ">
              <h1 className='font-bold text-xl '>Adept Automation</h1>
              <p className="address name text-sm font-semibold ">469 G.F., H.B. Colony, Sector-21 D</p>
              <p className="address name text-sm font-semibold ">Faridabad-121001( HR)</p>

              <p className="email name text-sm font-semibold">adeptautomation.cs@gmail.com</p>
              <p className="phone name text-sm font-semibold">9811306205, 9315878921</p>
              <p className="GST name text-sm font-semibold">06BLAPS9064A1Z7</p>
            </div>
            <div className="box1">
              <h2 className='text-sm font-semibold'>Consignee (Bill To)</h2>
              <h1 className='text-base font-semibold mt-1'>{companyName}</h1>
              <p className="address text-sm font-semibold">{streetAddress},</p>
              <p className="address text-sm font-semibold">{city}</p>
              <p className="address text-sm font-semibold">{state}</p>
              <p className="GST text-sm font-semibold">GSTIN/UIN: {gstNumber}</p>
            </div>
          </div>
          <hr className='hr' />
          <div className="row-details">
            <div>
              <h2>Consignee (Ship to)</h2>
              <h3>{companyName}</h3>
              <p className="address">{streetAddress},</p>
              <p className="address">{city}</p> 
              <p className="address">{state}</p>
              <p className="GST">GSTIN/UIN: {gstNumber}</p>
              <p className="email">E-Mail : {email}</p>
              <br />
              <p ><b>Kind Attn: {customerName},<br/> Mob - {phoneNumber}</b> </p>
              <p>EMAIL: purchase@dtekinnovative.com</p>
            </div>
            <div>
              <table className="right-table">
                <tbody>
                  <tr><td className="headings">Invoice No. :</td><td>{invoiceNumber}</td></tr>
                  <tr><td className="headings">Invoice Date :</td><td> {date}</td></tr>
                  <tr><td className="headings">PO. No. :</td><td>{poNumber}</td></tr>
                  <tr><td className="headings">PO. Date:</td><td> {poDate}</td></tr>
                  <tr><td className="headings">Payment Terms:</td><td> Against PI</td></tr>
                  <tr><td className="headings">Vendor Code:</td><td></td></tr>
                  <tr><td className="headings">Dispatch Through:</td><td> By Transport/Courier</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr className='hr1' />
          {/* Item Table */}
          <div className="goods-table-wrapper">
            <table className="goods-table">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Description of Goods</th>
                  <th>HSN</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Taxable Value</th>
                  {hasGST && <th>GST Rate</th>}
                  {hasGST && <th>GST Value</th>}
                  {hasCGST && <th>CGST %</th>}
                  {hasCGST && <th>CGST Value</th>}
                  {hasSGST && <th>SGST %</th>}
                  {hasSGST && <th>SGST Value</th>}
                  <th>Total Tax Value</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items && invoice.items.map((item, index) => {
                  const { description, hsn, unitPrice, tax1, tax2 } = item;
                  const gstRate = 18;
                  const quantity = item.quantity || 1;
                  const taxableValue = parseFloat(unitPrice || 0) * quantity;
                  const gstValue = (taxableValue * gstRate) / 100;
                  let sgstValue = 0;
                  let cgstValue = 0;
                  if (tax1 === "CGST" || tax2 === "CGST") {
                    cgstValue = (taxableValue * (gstRate / 2)) / 100;
                  }
                  if (tax1 === "SGST" || tax2 === "SGST") {
                    sgstValue = (taxableValue * (gstRate / 2)) / 100;
                  }
                
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="td">{description}</td>
                      <td className="td1">{hsn}</td>
                      <td className="td1">{quantity}</td>
                      <td className="td1">{unitPrice}</td>
                      <td className="td1">{taxableValue.toFixed(2)}</td>
                      {hasCGST && (
                        <>
                          <td>{(gstRate / 2).toFixed(1)}%</td>
                          <td>{cgstValue.toFixed(2)}</td>
                        </>
                      )}
                      {hasSGST && (
                        <>
                          <td>{(gstRate / 2).toFixed(1)}%</td>
                          <td>{sgstValue.toFixed(2)}</td>
                        </>
                      )}
                      {hasGST && (
                        <>
                          <td>{(gstRate).toFixed(1)}%</td>
                          <td>{gstValue.toFixed(2)}</td>
                        </>
                      )}
                      <td className="td1">{getTotalTaxValue(item, taxableValue).toFixed(2)}</td>
                    </tr>
                  );
                })}

                <tr>
                  <td colSpan={9} style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '19px' , marginBottom:"12px"}}>Grand Total</td>
                  <td style={{ fontWeight: 'bold', fontSize: '18px' }}>
                    {invoice.items.reduce((acc, item) => {
                      const taxable = parseFloat(item.unitPrice || '0') * (item.quantity || 1);
                      const totalTaxValue = getTotalTaxValue(item, taxable);
                      return acc + taxable + totalTaxValue;
                    }, 0).toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td colSpan={10} style={{ fontStyle: 'italic', fontWeight: 'bold', alignItems:"center"}}>
                    Amount in words: {numberToWords(invoice.items.reduce((acc, item) => {
                      const taxable = parseFloat(item.unitPrice || '0') * (item.quantity || 1);
                      const totalTaxValue = getTotalTaxValue(item, taxable);
                      return acc + taxable + totalTaxValue;
                    }, 0))} only.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex justify-between mt-4 text-base font-sans bank '>

          <div >
          <p>RTGS/ NEFT Detail :</p>
          <p>Beneficiary : Adept Automation</p>
          <p>Current Acc No: 0018102100000595</p>
          <p>Bank Name : Punjab National Bank:</p>
          <p>Branch Add : Neelam Chowk , NIT Faridabad</p>
          <p>IFSC Code : PUNB0001810</p>

          </div>
          <div className='mt-12'>
            <p>For ADEPT AUTOMATION</p>
            <br/>
            <br/>
            <p>Authorised Signatory |</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
