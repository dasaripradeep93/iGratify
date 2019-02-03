using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iGratify.Modals;
using iGratify.Repositories.Database;

namespace iGratify.Repositories
{
    public class LoginRepository
    {
        public iGratifyEntities db = null;
        public List<UserAccounts> checkUser(UserAccounts uad)
        {
            List<UserAccounts> uaList = new List<UserAccounts>();
            using (db = new iGratifyEntities())
            {
                var data = db.Spc_CheckUser(uad.UserID, uad.password);
                foreach (var items in data)
                {
                    UserAccounts ua = new UserAccounts();
                    ua.UserID = items.UserId;
                    ua.FullName = items.FirstName;
                    ua.Email = items.Email;
                    ua.MobileNo = items.MobileNo;
                    ua.Gender = items.Gender;

                    uaList.Add(ua);
                }
            }
            return uaList;
        }
    }
}
