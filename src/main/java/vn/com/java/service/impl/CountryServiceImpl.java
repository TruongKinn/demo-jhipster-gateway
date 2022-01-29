package vn.com.java.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.com.java.domain.Country;
import vn.com.java.repository.CountryRepository;
import vn.com.java.service.CountryService;
import vn.com.java.service.dto.CountryDTO;
import vn.com.java.service.mapper.CountryMapper;

/**
 * Service Implementation for managing {@link Country}.
 */
@Service
@Transactional
public class CountryServiceImpl implements CountryService {

    private final Logger log = LoggerFactory.getLogger(CountryServiceImpl.class);

    private final CountryRepository countryRepository;

    private final CountryMapper countryMapper;

    public CountryServiceImpl(CountryRepository countryRepository, CountryMapper countryMapper) {
        this.countryRepository = countryRepository;
        this.countryMapper = countryMapper;
    }

    @Override
    public Mono<CountryDTO> save(CountryDTO countryDTO) {
        log.debug("Request to save Country : {}", countryDTO);
        return countryRepository.save(countryMapper.toEntity(countryDTO)).map(countryMapper::toDto);
    }

    @Override
    public Mono<CountryDTO> partialUpdate(CountryDTO countryDTO) {
        log.debug("Request to partially update Country : {}", countryDTO);

        return countryRepository
            .findById(countryDTO.getId())
            .map(existingCountry -> {
                countryMapper.partialUpdate(existingCountry, countryDTO);

                return existingCountry;
            })
            .flatMap(countryRepository::save)
            .map(countryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<CountryDTO> findAll() {
        log.debug("Request to get all Countries");
        return countryRepository.findAll().map(countryMapper::toDto);
    }

    public Mono<Long> countAll() {
        return countryRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<CountryDTO> findOne(Long id) {
        log.debug("Request to get Country : {}", id);
        return countryRepository.findById(id).map(countryMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Country : {}", id);
        return countryRepository.deleteById(id);
    }
}
