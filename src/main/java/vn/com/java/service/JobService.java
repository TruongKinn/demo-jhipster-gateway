package vn.com.java.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.com.java.domain.Job;
import vn.com.java.repository.JobRepository;
import vn.com.java.service.dto.JobDTO;
import vn.com.java.service.mapper.JobMapper;

/**
 * Service Implementation for managing {@link Job}.
 */
@Service
@Transactional
public class JobService {

    private final Logger log = LoggerFactory.getLogger(JobService.class);

    private final JobRepository jobRepository;

    private final JobMapper jobMapper;

    public JobService(JobRepository jobRepository, JobMapper jobMapper) {
        this.jobRepository = jobRepository;
        this.jobMapper = jobMapper;
    }

    /**
     * Save a job.
     *
     * @param jobDTO the entity to save.
     * @return the persisted entity.
     */
    public Mono<JobDTO> save(JobDTO jobDTO) {
        log.debug("Request to save Job : {}", jobDTO);
        return jobRepository.save(jobMapper.toEntity(jobDTO)).map(jobMapper::toDto);
    }

    /**
     * Partially update a job.
     *
     * @param jobDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<JobDTO> partialUpdate(JobDTO jobDTO) {
        log.debug("Request to partially update Job : {}", jobDTO);

        return jobRepository
            .findById(jobDTO.getId())
            .map(existingJob -> {
                jobMapper.partialUpdate(existingJob, jobDTO);

                return existingJob;
            })
            .flatMap(jobRepository::save)
            .map(jobMapper::toDto);
    }

    /**
     * Get all the jobs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Flux<JobDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Jobs");
        return jobRepository.findAllBy(pageable).map(jobMapper::toDto);
    }

    /**
     * Get all the jobs with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Flux<JobDTO> findAllWithEagerRelationships(Pageable pageable) {
        return jobRepository.findAllWithEagerRelationships(pageable).map(jobMapper::toDto);
    }

    /**
     * Returns the number of jobs available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return jobRepository.count();
    }

    /**
     * Get one job by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Mono<JobDTO> findOne(Long id) {
        log.debug("Request to get Job : {}", id);
        return jobRepository.findOneWithEagerRelationships(id).map(jobMapper::toDto);
    }

    /**
     * Delete the job by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Job : {}", id);
        return jobRepository.deleteById(id);
    }
}
