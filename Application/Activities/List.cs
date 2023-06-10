using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query: IRequest<List<Activity>>{}

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
        private readonly DataContext _context;
        private readonly ILogger<List> _loggger;
            public Handler(DataContext context, ILogger<List> loggger)
            {
            _loggger = loggger;
            _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    for(var i=0; i<0; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(1000, cancellationToken);
                        _loggger.LogInformation($"Task {i} has completed");
                    }
                }
                catch (System.Exception)
                {
                    
                    _loggger.LogInformation("Task was concelled");
                }

                return await _context.Activities.ToListAsync();
            }
        }
    }
}