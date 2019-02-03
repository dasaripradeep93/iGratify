using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using iGratify.Service;
using iGratify.Contracts;
using iGratify.Modals;

namespace iGratify.Controllers
{
    [RoutePrefix("api/Login")]
    public class LoginController : ApiController
    {
        LoginService srv = new LoginService();
        [HttpPost, Route("checkUser")]
        public IHttpActionResult checkUser([FromBody]UserDetails ud) {
            try
            {
                UserAccounts ua = ConvertToModal(ud);
                return Ok(srv.CheckUser(ua));
            }
            catch (Exception e) {
                return Ok(e.Message);
            }
        }

        public UserAccounts ConvertToModal(UserDetails ud) {
            UserAccounts ua = new UserAccounts();
            ua.UserID = ud.UserID;
            ua.password = ud.password;

            return ua;
        }
    }
}
