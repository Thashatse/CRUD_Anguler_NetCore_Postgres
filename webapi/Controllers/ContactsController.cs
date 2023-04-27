using Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class ContactsController : ControllerBase
{
    private Context _context;
    private static int numberOfObjectsPerPage = 10;

    public ContactsController(Context context)
    {
        _context = context;
    }

    private IQueryable<ContactAPIModel> Contacts =>
        _context.contacts.Select(x => new ContactAPIModel
        {
            Id = x.id,
            Name = x.name,
            Surname = x.surname,
            TelephoneNumber = x.telephonenumber,
            EmailAddresss = x.emailaddresss,
            DateOfBirth = x.dateofbirth,
        });

    private ContactAPIModel? GetSingleContact(long id) => Contacts.Where(x => x.Id == id).SingleOrDefault();

    private IActionResult ErrorHandeler => StatusCode(StatusCodes.Status500InternalServerError);

    [HttpGet]
    public IActionResult Get(int pageNumber = 1)
    {
        try
        {
            var data = Contacts.OrderByDescending(x => x.Id)
                              .Skip(numberOfObjectsPerPage * (pageNumber - 1))
                              .Take(numberOfObjectsPerPage)
                              .ToList();

            return Ok(data);
        }
        catch
        {
            //do not exposed underhanded exceptions
            return ErrorHandeler;
        }
    }

    [HttpGet]
    [Route("GetContact")]
    public IActionResult GetSingle(long id)
    {
        try
        {
            var contact = GetSingleContact(id);

            if (contact == null)
                return NotFound();

            return Ok(contact);
        }
        catch
        {
            //do not exposed underhanded exceptions
            return ErrorHandeler;
        }
    }

    [HttpPost]
    public IActionResult AddOrUpdate(ContactAPIModel contact)
    {
        try
        {
            #region Create or Update
            var isContactNew = contact.Id == 0;
            var entity = isContactNew ? contact.ToDataModel() : _context.contacts.Where(x => x.id == contact.Id).Select(x => x).SingleOrDefault();

            if (entity == null)
                return NotFound();

            if (isContactNew)
            {
                _context.Set<Contact>().Add(entity);
            }
            else
            {
                _context.Set<Contact>().Update(entity);
            }

            _context.SaveChanges();
            #endregion

            #region return updated model
            var data = GetSingleContact(entity.id);

            if (data == null)
                return NotFound();

            return Ok(data);
            #endregion
        }
        catch
        {
            //do not exposed underhanded exceptions
            return ErrorHandeler;
        }
    }

    [HttpDelete]
    public IActionResult DeleteContact(long id)
    {
        try
        {
            var entity = _context.contacts.Where(x => x.id == id).Select(x => x).SingleOrDefault();

            if (entity == null)
                return NotFound();

            _context.Set<Contact>().Remove(entity);
            _context.SaveChanges();

            return Ok();
        }
        catch
        {
            //do not exposed underhanded exceptions
            return ErrorHandeler;
        }
    }
}
