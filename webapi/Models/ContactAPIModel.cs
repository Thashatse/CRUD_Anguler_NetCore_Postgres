using Data.Models;
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class ContactAPIModel
    {
        private Contact _model = new Contact();

        public long Id { get { return _model.id; } set { _model.id = value; } }
        public string Name { get { return _model.name; } set { _model.name = value; } }
        public string Surname { get { return _model.surname; } set { _model.surname = value; } }
        public decimal TelephoneNumber { get { return _model.telephonenumber; } set { _model.telephonenumber = value; } }
        public string EmailAddresss { get { return _model.emailaddresss; } set { _model.emailaddresss = value; } }
        public DateTime DateOfBirth { get { return _model.dateofbirth; } set { _model.dateofbirth = value; } }

        public ContactAPIModel() { }
        public ContactAPIModel(Contact contact)
        {
            _model = contact;
        }
        internal Contact ToDataModel()
        {
            return _model;
        }
    }
}
