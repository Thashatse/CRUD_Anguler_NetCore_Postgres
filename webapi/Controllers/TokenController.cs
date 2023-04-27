using Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly Context _context;

        public TokenController(IConfiguration config, Context context)
        {
            _configuration = config;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserApiModel _userData)
        {
            if (_userData != null && _userData.username != null && _userData.password != null)
            {
                var user = await GetUser(_userData.username, _userData.password);

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim("iss", _configuration["Jwt:Issuer"]),
                        new Claim("aud", _configuration["Jwt:Audience"]),
                        new Claim("iat", DateTime.UtcNow.ToString()),
                        new Claim("jti", Guid.NewGuid().ToString()),
                        new Claim("sub", user.id.ToString()),
                        new Claim("DisplayName", user.username),
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        private async Task<Users?> GetUser(string username, string password)
        {
            //PASSWORD SHOULD NOT BE STORED IN PLAIN TEXT THIS IS JUST FOR DEMONSTRATION PURPOSES
            return await _context.users.FirstOrDefaultAsync(u => u.username == username && u.password == password);
        }
    }
}