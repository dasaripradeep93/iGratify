using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iGratify.Repositories;
using iGratify.Modals;

namespace iGratify.Service
{
    public class CreateUserService
    {
        CreateUserRepository repo = new CreateUserRepository();
        public List<GetDDL> GetGender()
        {
            return repo.GetGenderList();
        }
        public List<GetDDL> GetProfession()
        {
            return repo.GetProfessionList();
        }

        public List<GetDDL> GetDomain()
        {
            return repo.GetDomainList();
        }

        public List<GetDDL> GetEducation()
        {
            return repo.GetEducationList();
        }

        public void saveUserDetails(UserAccounts ua) {
             repo.saveUserDetails(ua);
        }

        public int saveOTP(UserAccounts ua) {
          return  repo.saveOTP(ua);
        }

        public int validateOTP(UserAccounts ua) {
            return repo.validateOTP(ua);
        }

    }
}
