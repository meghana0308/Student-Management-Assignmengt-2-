using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentApi.Data;
using StudentApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace StudentApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly StudentDbContext _ctx;

        public StudentsController(StudentDbContext ctx)
        {
            _ctx = ctx;

            if (!_ctx.Students.Any())
            {
                _ctx.Students.AddRange(
                    new Student { Name = "Rahul", Class = "10", Section = "A" },
                    new Student { Name = "Anita", Class = "9", Section = "B" }
                );
                _ctx.SaveChanges();
            }

        }

        [HttpGet]
        public async Task<IActionResult> GetStudents()
        {
            var students = await _ctx.Students.ToListAsync();
            return Ok(students);
        }

        [HttpPost]
        public async Task<IActionResult> AddStudent(Student student)
        {
            _ctx.Students.Add(student);
            await _ctx.SaveChangesAsync();
            return Ok(student);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student updated)
        {
            var existing = await _ctx.Students.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Name = updated.Name;
            existing.Class = updated.Class;
            existing.Section = updated.Section;

            await _ctx.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _ctx.Students.FindAsync(id);
            if (student == null) return NotFound();

            _ctx.Students.Remove(student);
            await _ctx.SaveChangesAsync();
            return Ok();
        }
    }
}
