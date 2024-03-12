const axios=require("axios").default;
// Important: If axios is used with multiple domains, the information will be sent to all of them.
const cheerio=require("cheerio");
const nodemailer=require("nodemailer");

//const url="https://www.amazon.in/Samsung-Galaxy-Ultra-Phantom-Storage/dp/B0BTWQZBGP/ref=sr_1_1?crid=29SIU0FL2SBNR&dib=eyJ2IjoiMSJ9.Duh6u-ga9FIdhas-cwhKdypL9mo0zptVm6k9ocpOozbrDx5wG85Qv-kQ-3QvuJ39N_ArY6f2lqysymx863MeTnjj-npINn_ErNVHUJesHHsgr6k3hGi3IrlHP09JiHj0BOdqygoFJ_36eMph67Z9OnRgi5fz3mBD5V4K9Mbvmo0iLhHFyNIorQ8L5hzizO29zAYJK6KyE5JmFENVMAvsxkD7mH6nhcEyMkFn3_ScLJw.IMLGjSslBFLmdlSnTumZfv46P7TKdupnrsOrjwxFnwA&dib_tag=se&keywords=s23+ultra+samsung&qid=1709487040&sprefix=s23%2Caps%2C288&sr=8-1";
const url ="https://www.amazon.in/Chanakya-Lavkesh-romantic-inner-coffee/dp/B076PRKLST/ref=sr_1_1?crid=3TQ5K26J07X1G&dib=eyJ2IjoiMSJ9.fyV-pECy91Zt7D04BhJ-zay1n6i2Hz4wQOJfwLJt-4-SU-hFMe66ZqoAa8gY8nC_cfCidJvKUjns7lHaxBgc2bfX_h7jKiCcHM4LNMW1yVo.U_aHpD7Q7JfIxWIYIlrgOuX-zJ6IpO6Axs2v6-On4GU&dib_tag=se&keywords=lavkesh&qid=1710258735&sprefix=lankesh%2Caps%2C237&sr=8-1"
const userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const expectedPrices={
    new:90000,
    old:80000
};
//we didn't call the function that is why code didn't execute 
fetchPrice()
async function fetchPrice(){
    
    const response=await axios.get(url,{
        headers: {
            "User-Agent": userAgent
        }
    });
    const html=response.data;
    const vh=cheerio.load(html);
    //To parse the html response from the url 
    const priceElementText= vh(".a-price-whole").text();
    //the method returns the array of elements belonging to the same class in the 
    //html document so split it using the . operator and return the first value
    const price =    priceElementText.split('.');
    console.log(price[0]);
}
