using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using iGratify.Service;
using Newtonsoft.Json;
using System.Text;
using iGratify.Contracts;
using iGratify.Modals;
using System.Net.Mail;

namespace iGratify.Controllers
{
    [RoutePrefix("api/CreateUser")]
    public class CreateUserController : ApiController
    {
        CreateUserService srv = new CreateUserService();
        [HttpGet, Route("getgender")]
        public IHttpActionResult GetGender()
        {
            try
            {
                return Ok(srv.GetGender());
            }
            catch (Exception e)
            {
                return Ok(this.processException(e));
            }
        }

        [HttpGet, Route("getProfession")]
        public IHttpActionResult GetProfession()
        {
            try
            {
                return Ok(srv.GetProfession());
            }
            catch (Exception e)
            {
                return Ok(this.processException(e));
            }
        }

        [HttpGet, Route("getDomain")]
        public IHttpActionResult GetDomain()
        {
            try
            {
                return Ok(srv.GetDomain());
            }
            catch (Exception e)
            {
                return Ok(this.processException(e));
            }
        }

        [HttpGet, Route("getEducation")]
        public IHttpActionResult GetEducation()
        {
            try
            {
                return Ok(srv.GetEducation());
            }
            catch (Exception e)
            {
                return Ok(this.processException(e));
            }
        }

        [HttpPost, Route("saveUserDetails")]
        public IHttpActionResult SaveUserDetails([FromBody]UserDetails input)
        {
            try
            {
                UserAccounts ua = converToUserAccountsModal(input);
                srv.saveUserDetails(ua);
                return Ok();
            }
            catch (Exception e)
            {
                return Ok(this.processException(e));
            }
        }

        [HttpPost, Route("generateOTP")]
        public IHttpActionResult GenerateOTP([FromBody]UserDetails input)
        {
            try
            {
                UserAccounts ua = converToUserAccountsModal(input);

                Random rnd = new Random();
                int otp = rnd.Next(1000, 9999);
                int result = 0;
                bool f = false;
                string msg = "your otp from iGratify is "+ otp;
                if (otp != 0)
                {
                    ua.OTP = otp.ToString();
                    result = srv.saveOTP(ua);
                }
                if (result == 1)
                {
                    f = SendOTP("igratifyweb@gmail.com", "pradeep9440@gmail.com", "Subjected to OTP", msg);
                }
                if (f)
                {
                    return Ok("otp sent successfully");
                }
                else
                {
                    return Ok("otp not sent");
                }
            }
            catch (Exception e)
            {
                return Ok(this.processException(e));
            }
        }

        public bool SendOTP(string from, string to, string subject, string body)
        {
            bool f = false;
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.To.Add(to);
                mailMessage.From = new MailAddress(from);
                mailMessage.Subject = subject;
                mailMessage.Body = body;
                SmtpClient smtpClient = new SmtpClient();
                smtpClient.Host = "smtp.gmail.com";
                smtpClient.EnableSsl = true;
                NetworkCredential NetworkCred = new NetworkCredential("igratifyweb@gmail.com", "igratify@123");
                smtpClient.UseDefaultCredentials = true;
                smtpClient.Credentials = NetworkCred;
                smtpClient.Port = 587;
                smtpClient.Send(mailMessage);
                f = true;
            }
            catch (Exception ex)
            {
                f = false;
            }
            return f;
        }

        [HttpPost, Route("validateOTP")]
        public IHttpActionResult ValidateOTP([FromBody]UserDetails input) {
            UserAccounts ua = converToUserAccountsModal(input);

            int result=0;
            try
            {
              result= srv.validateOTP(ua);
            }
            catch (Exception e) {

            }
            return Ok(result);
        }

        public UserAccounts converToUserAccountsModal(UserDetails input)
        {
            UserAccounts ua = new UserAccounts();
            ua.UserID = input.UserID;
            ua.password = input.password;
            ua.FullName = input.FullName;
            ua.Email = input.Email;
            ua.MobileNo = input.MobileNo;
            ua.Gender = input.Gender;
            ua.Profession = input.Profession;
            ua.Domain = input.Domain;
            ua.Industry = input.Industry;
            ua.Country = input.Country;

            return ua;
        }

        private HttpResponseMessage processException(Exception exception)
        {
            var httpResponseMessage = new HttpResponseMessage(HttpStatusCode.NotAcceptable);
            httpResponseMessage.Content = new StringContent(JsonConvert.SerializeObject(exception.Message), Encoding.UTF8, "application/json");
            httpResponseMessage.Headers.Add("ExceptionMessage", JsonConvert.SerializeObject(exception.Message));
            //httpResponseMessage.ReasonPhrase = itemSetting[0].SettingValue;
            return httpResponseMessage;
        }
    }
}
