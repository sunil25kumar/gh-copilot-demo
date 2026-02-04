using albums_api.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace albums_api.Controllers
{
    [Route("albums")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        // GET: api/album
        [HttpGet]
        public IActionResult Get([FromQuery] string? sort = null, [FromQuery] string? dir = "asc")
        {
            var albums = Album.GetAll();

            if (!string.IsNullOrWhiteSpace(sort))
            {
                var key = sort.Trim().ToLowerInvariant();
                var descending = string.Equals(dir, "desc", StringComparison.OrdinalIgnoreCase);

                albums = key switch
                {
                    "title" => descending ? albums.OrderByDescending(a => a.Title).ToList() : albums.OrderBy(a => a.Title).ToList(),
                    "artist" => descending ? albums.OrderByDescending(a => a.Artist).ToList() : albums.OrderBy(a => a.Artist).ToList(),
                    "price" => descending ? albums.OrderByDescending(a => a.Price).ToList() : albums.OrderBy(a => a.Price).ToList(),
                    _ => albums
                };
            }

            return Ok(albums);
        }

        // GET api/<AlbumController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var album = Album.GetById(id);
            if (album is null)
            {
                return NotFound();
            }

            return Ok(album);
        }

    }
}
