using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iGratify.Modals;
using iGratify.Repositories;

namespace iGratify.Service
{
    public class LoginService
    {
        LoginRepository repo = new LoginRepository();

        public List<UserAccounts> CheckUser(UserAccounts ua) {
           return repo.checkUser(ua);
        }
    }
}
